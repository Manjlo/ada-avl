// src/lib/avl.js

/**
 * Represents a node in the AVL tree.
 */
class Node {
  constructor(task) {
    this.task = task;
    this.key = task.id;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

/**
 * An AVL Tree implementation for storing and retrieving tasks by their ID.
 * It maintains balance through rotations (LL, RR, LR, RL) to ensure
 * logarithmic time complexity for insertions, deletions, and searches.
 */
export class AVLTree {
  constructor() {
    this.root = null;
  }

  // Get height of a node
  _height(node) {
    return node ? node.height : 0;
  }

  // Update height of a node
  _updateHeight(node) {
    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  // Get balance factor of a node
  _getBalance(node) {
    return node ? this._height(node.left) - this._height(node.right) : 0;
  }

  // Right rotation (LL imbalance)
  _rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this._updateHeight(y);
    this._updateHeight(x);

    return x;
  }

  // Left rotation (RR imbalance)
  _leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this._updateHeight(x);
    this._updateHeight(y);

    return y;
  }

  insert(task) {
    this.root = this._insert(this.root, task);
  }

  _insert(node, task) {
    // 1. Standard BST insertion
    if (!node) {
      return new Node(task);
    }

    if (task.id < node.key) {
      node.left = this._insert(node.left, task);
    } else if (task.id > node.key) {
      node.right = this._insert(node.right, task);
    } else {
      // Duplicate keys are not allowed
      return node;
    }

    // 2. Update height of this ancestor node
    this._updateHeight(node);

    // 3. Get the balance factor
    const balance = this._getBalance(node);

    // 4. If unbalanced, perform rotations
    // Left Left Case
    if (balance > 1 && task.id < node.left.key) {
      return this._rightRotate(node);
    }
    // Right Right Case
    if (balance < -1 && task.id > node.right.key) {
      return this._leftRotate(node);
    }
    // Left Right Case
    if (balance > 1 && task.id > node.left.key) {
      node.left = this._leftRotate(node.left);
      return this._rightRotate(node);
    }
    // Right Left Case
    if (balance < -1 && task.id < node.right.key) {
      node.right = this._rightRotate(node.right);
      return this._leftRotate(node);
    }

    return node;
  }

  delete(id) {
    this.root = this._delete(this.root, id);
  }

  _delete(node, key) {
    if (!node) return node;

    // 1. Standard BST delete
    if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        const temp = this._minValueNode(node.right);
        node.key = temp.key;
        node.task = temp.task;
        node.right = this._delete(node.right, temp.key);
      }
    }

    if (!node) return node;

    // 2. Update height
    this._updateHeight(node);

    // 3. Get balance and perform rotations
    const balance = this._getBalance(node);
    
    // Left Left
    if (balance > 1 && this._getBalance(node.left) >= 0) {
      return this._rightRotate(node);
    }
    // Left Right
    if (balance > 1 && this._getBalance(node.left) < 0) {
      node.left = this._leftRotate(node.left);
      return this._rightRotate(node);
    }
    // Right Right
    if (balance < -1 && this._getBalance(node.right) <= 0) {
      return this._leftRotate(node);
    }
    // Right Left
    if (balance < -1 && this._getBalance(node.right) > 0) {
      node.right = this._rightRotate(node.right);
      return this._leftRotate(node);
    }

    return node;
  }

  _minValueNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  find(id) {
    let current = this.root;
    while (current) {
      if (id === current.key) {
        return current.task;
      }
      if (id < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  inOrder() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }

  _inOrder(node, result) {
    if (node) {
      this._inOrder(node.left, result);
      result.push(node.task);
      this._inOrder(node.right, result);
    }
  }
}