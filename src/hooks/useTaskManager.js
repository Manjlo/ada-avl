// src/hooks/useTaskManager.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { BinaryHeap } from '../lib/heap';
import { AVLTree } from '../lib/avl';
import { loadTasks, saveTasks } from '../lib/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook to manage the entire task system.
 * It orchestrates the BinaryHeap, AVLTree, and localStorage persistence.
 */
export function useTaskManager() {
  const [tasksList, setTasksList] = useState([]);
  const [avlRoot, setAvlRoot] = useState(null); // For visualization
  const heap = useRef(new BinaryHeap());
  const avl = useRef(new AVLTree());
  const nextId = useRef(101); // Ref to hold the next available ID

  const isInitialMount = useRef(true);

  // Load tasks from storage on initial render
  useEffect(() => {
    const initialTasks = loadTasks();

    // Determine the next ID based on existing tasks
    if (initialTasks.length > 0) {
      const maxId = initialTasks.reduce((max, task) => Math.max(max, task.id), 0);
      nextId.current = maxId + 1;
    } else {
      nextId.current = 101; // Start from 101 if no tasks exist
    }
    
    // Reconstruct heap and AVL tree from loaded tasks
    heap.current = new BinaryHeap();
    avl.current = new AVLTree();
    initialTasks.forEach(task => {
      heap.current.push(task);
      avl.current.insert(task);
    });

    setTasksList(initialTasks);
    setAvlRoot(avl.current.root);
  }, []);

  // Persist tasks to storage whenever the list changes
  useEffect(() => {
    // On the initial render, tasks are loaded from storage, so we don't want
    // to immediately overwrite that with an empty array. This check prevents that.
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      saveTasks(tasksList);
    }
  }, [tasksList]);

  const addTask = useCallback((taskData) => {
    const newId = nextId.current++; // Use and increment the sequential ID
    const newTask = { ...taskData, id: newId };

    // This check is now more important to prevent unforeseen collisions
    if (avl.current.find(newTask.id)) {
      console.error(`Task with ID ${newTask.id} already exists. This should not happen.`);
      // Attempt to recover by trying the next ID
      newTask.id = nextId.current++;
      if (avl.current.find(newTask.id)) {
         console.error(`Task with ID ${newTask.id} also exists. Aborting task creation.`);
         return; // Abort if recovery fails
      }
    }

    heap.current.push(newTask);
    avl.current.insert(newTask);

    setTasksList(prevTasks => [...prevTasks, newTask]);
    setAvlRoot(avl.current.root ? { ...avl.current.root } : null); // Clone root to trigger re-render
  }, []);

  const completeTask = useCallback((id) => {
    heap.current.removeById(id);
    avl.current.delete(id);

    setTasksList(prevTasks => prevTasks.filter(task => task.id !== id));
    setAvlRoot(avl.current.root ? { ...avl.current.root } : null); // Clone root to trigger re-render
  }, []);

  const getTopTask = useCallback(() => {
    return heap.current.peek();
  }, []);

  const popTopTask = useCallback(() => {
    const topTask = heap.current.pop();
    if (topTask) {
      avl.current.delete(topTask.id);
      setTasksList(prevTasks => prevTasks.filter(task => task.id !== topTask.id));
      setAvlRoot(avl.current.root ? { ...avl.current.root } : null);
    }
    return topTask;
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    // Create a new list with the updated task
    const updatedTasks = tasksList.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    // Rebuild the heap and AVL tree from scratch with the updated data
    const newHeap = new BinaryHeap();
    const newAvl = new AVLTree();
    updatedTasks.forEach(task => {
      newHeap.push(task);
      newAvl.insert(task);
    });

    heap.current = newHeap;
    avl.current = newAvl;

    // Update state to trigger re-renders
    setTasksList(updatedTasks);
    setAvlRoot(avl.current.root ? { ...avl.current.root } : null);
  }, [tasksList]);

  const findTask = useCallback((id) => {
    return avl.current.find(id);
  }, []);

  return {
    tasksList,
    avlRoot,
    addTask,
    completeTask,
    getTopTask,
    popTopTask,
    updateTask,
    findTask,
  };
}