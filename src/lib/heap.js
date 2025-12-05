// src/lib/heap.js

/**
 * A Max-Heap implementation that stores tasks and prioritizes them.
 * It uses an id-to-index map for efficient O(log n) removal of tasks by their ID.
 * The priority is determined by the task's `priority` field (higher is better)
 * and `dueDate` (earlier is better) as a tie-breaker.
 */
export class BinaryHeap {
  constructor() {
    this.heap = [];
    this.idToIndex = new Map();
  }

  // Comparison function for tasks
  _compare(i, j) {
    const taskA = this.heap[i];
    const taskB = this.heap[j];

    if (taskA.priority !== taskB.priority) {
      return taskA.priority > taskB.priority;
    }
    return new Date(taskA.dueDate) < new Date(taskB.dueDate);
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    this.idToIndex.set(this.heap[i].id, i);
    this.idToIndex.set(this.heap[j].id, j);
  }

  _heapifyUp(index) {
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this._compare(index, parentIndex)) {
      this._swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  _heapifyDown(index) {
    let maxIndex = index;
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    const size = this.heap.length;

    if (leftChild < size && this._compare(leftChild, maxIndex)) {
      maxIndex = leftChild;
    }
    if (rightChild < size && this._compare(rightChild, maxIndex)) {
      maxIndex = rightChild;
    }

    if (index !== maxIndex) {
      this._swap(index, maxIndex);
      this._heapifyDown(maxIndex);
    }
  }

  push(task) {
    this.heap.push(task);
    const index = this.heap.length - 1;
    this.idToIndex.set(task.id, index);
    this._heapifyUp(index);
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  pop() {
    if (this.heap.length === 0) return null;

    const topTask = this.heap[0];
    this.idToIndex.delete(topTask.id);

    if (this.heap.length === 1) {
      this.heap.pop();
      return topTask;
    }

    this.heap[0] = this.heap.pop();
    this.idToIndex.set(this.heap[0].id, 0);
    this._heapifyDown(0);

    return topTask;
  }

  removeById(id) {
    if (!this.idToIndex.has(id)) return null;

    const indexToRemove = this.idToIndex.get(id);
    const removedTask = this.heap[indexToRemove];
    this.idToIndex.delete(id);

    if (this.heap.length === 1 || indexToRemove === this.heap.length - 1) {
      this.heap.pop();
      return removedTask;
    }
    
    this.heap[indexToRemove] = this.heap.pop();
    this.idToIndex.set(this.heap[indexToRemove].id, indexToRemove);

    const parentIndex = Math.floor((indexToRemove - 1) / 2);
    if (indexToRemove === 0 || this._compare(parentIndex, indexToRemove)) {
      this._heapifyDown(indexToRemove);
    } else {
      this._heapifyUp(indexToRemove);
    }

    return removedTask;
  }

  size() {
    return this.heap.length;
  }

  toArray() {
    return [...this.heap];
  }
}