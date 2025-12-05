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

  // Load tasks from storage on initial render
  useEffect(() => {
    const initialTasks = loadTasks();
    
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
    saveTasks(tasksList);
  }, [tasksList]);

  const addTask = useCallback((taskData) => {
    // Use a numeric-like but unique ID for AVL tree compatibility
    const newId = Date.now();
    const newTask = { ...taskData, id: newId };

    // Check for duplicate ID (highly unlikely with Date.now, but good practice)
    if (avl.current.find(newTask.id)) {
      console.error("Task with this ID already exists.");
      // In a real app, you'd show a user-facing error.
      return;
    }

    heap.current.push(newTask);
    avl.current.insert(newTask);

    setTasksList(prevTasks => [...prevTasks, newTask]);
    setAvlRoot({ ...avl.current.root }); // Clone root to trigger re-render
  }, []);

  const completeTask = useCallback((id) => {
    heap.current.removeById(id);
    avl.current.delete(id);

    setTasksList(prevTasks => prevTasks.filter(task => task.id !== id));
    setAvlRoot({ ...avl.current.root }); // Clone root to trigger re-render
  }, []);

  const getTopTask = useCallback(() => {
    return heap.current.peek();
  }, []);

  const popTopTask = useCallback(() => {
    const topTask = heap.current.pop();
    if (topTask) {
      avl.current.delete(topTask.id);
      setTasksList(prevTasks => prevTasks.filter(task => task.id !== topTask.id));
      setAvlRoot({ ...avl.current.root });
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
    setAvlRoot({ ...avl.current.root });
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