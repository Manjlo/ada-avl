// src/lib/storage.js

const STORAGE_KEY = 'tm_tasks_v1';

/**
 * Saves a list of tasks to localStorage.
 * @param {Array<Object>} tasks - The array of task objects to save.
 */
export function saveTasks(tasks) {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

/**
 * Loads the list of tasks from localStorage.
 * @returns {Array<Object>} The array of task objects, or an empty array if none are found or an error occurs.
 */
export function loadTasks() {
  try {
    const serializedTasks = localStorage.getItem(STORAGE_KEY);
    if (serializedTasks === null) {
      // For demonstration, let's seed with some initial data if storage is empty.
      const seedData = [
        { id: 101, description: 'Estudiar para el examen', priority: 3, dueDate: '2025-12-05' },
        { id: 102, description: 'Comprar útiles escolares', priority: 2, dueDate: '2025-12-05' },
        { id: 103, description: 'Revisar correos electrónicos', priority: 1, dueDate: '2025-12-05' },
      ];
      saveTasks(seedData);
      return seedData;
    }
    return JSON.parse(serializedTasks);
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
}

// Note for future improvement:
// To switch to IndexedDB, you would replace the implementation of saveTasks and loadTasks.
// The API would be asynchronous (returning Promises).
// 1. Create a database and object store in a separate initialization file.
// 2. `saveTasks` would clear the existing object store and add all new tasks in a transaction.
// 3. `loadTasks` would open a transaction and use a cursor to retrieve all tasks.
// This would be more robust for larger datasets.