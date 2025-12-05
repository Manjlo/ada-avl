// src/components/AVLVisualizer.jsx
import { useMemo } from 'react';
import './AVLVisualizer.css';

// 1. Reduced sizes for a cleaner look
const NODE_RADIUS = 18;
const LEVEL_HEIGHT = 60;
const HORIZONTAL_GAP = 20;
const PADDING = 20;

/**
 * Calculates the position of each node in the tree using a recursive,
 * post-order traversal approach to prevent overlaps and center parents.
 */
function calculatePositions(node, level = 0, xOffset = 0, positions = {}) {
  if (!node) {
    return { positions, width: 0 };
  }

  // Process left subtree first
  const left = calculatePositions(node.left, level + 1, xOffset, positions);
  const leftWidth = left.width;

  // Position the current node after the left subtree
  const nodeX = xOffset + leftWidth + (leftWidth > 0 ? HORIZONTAL_GAP : 0);
  positions[node.key] = {
    x: nodeX + NODE_RADIUS,
    y: level * LEVEL_HEIGHT + NODE_RADIUS,
  };

  // Process the right subtree, starting after the current node
  const rightX = nodeX + NODE_RADIUS * 2;
  const right = calculatePositions(node.right, level + 1, rightX + (leftWidth > 0 ? HORIZONTAL_GAP : 0), positions);
  const rightWidth = right.width;

  // Total width is the sum of all parts
  const totalWidth = leftWidth + (leftWidth > 0 ? HORIZONTAL_GAP : 0) +
                     NODE_RADIUS * 2 +
                     (rightWidth > 0 ? HORIZONTAL_GAP : 0) + rightWidth;

  return { positions, width: totalWidth };
}


// A simple, non-animated component to render a single node
const Node = ({ node, positions, parentPosition }) => {
  if (!node) return null;

  const pos = positions[node.key];
  const priorityClassName = `priority-${node.task.priority}`;

  return (
    <g>
      {/* Line from parent to current node */}
      {parentPosition && (
        <line
          x1={parentPosition.x}
          y1={parentPosition.y}
          x2={pos.x}
          y2={pos.y}
          className="node-line"
        />
      )}

      {/* Recursive rendering for children */}
      <Node node={node.left} positions={positions} parentPosition={pos} />
      <Node node={node.right} positions={positions} parentPosition={pos} />

      {/* Node group (circle + text) */}
      <g transform={`translate(${pos.x}, ${pos.y})`}>
        <circle
          className={`node-circle ${priorityClassName}`}
          r={NODE_RADIUS}
        />
        <text
          className="node-text"
          dy=".3em"
        >
          {`P:${node.task.priority}`}
        </text>
        <title>{`ID: ${node.key}\nDesc: ${node.task.description}\nVence: ${node.task.dueDate}`}</title>
      </g>
    </g>
  );
};

export function AVLVisualizer({ root }) {
  const { positions, viewBox } = useMemo(() => {
    if (!root) {
      return { positions: {}, viewBox: `0 0 0 0` };
    }

    // 2. Calculate all node positions first
    const { positions } = calculatePositions(root);

    // 3. Dynamically determine the bounding box of the tree
    let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const key in positions) {
      const pos = positions[key];
      minX = Math.min(minX, pos.x - NODE_RADIUS);
      maxX = Math.max(maxX, pos.x + NODE_RADIUS);
      maxY = Math.max(maxY, pos.y + NODE_RADIUS);
    }

    const width = maxX - minX + PADDING * 2;
    const height = maxY + PADDING;
    const viewBoxX = minX - PADDING;
    const viewBoxY = 0;

    return { positions, viewBox: `${viewBoxX} ${viewBoxY} ${width} ${height}` };
  }, [root]);

  return (
    <div className="visualizer-container">
      <h2 className="visualizer-title">Visualización del Árbol AVL</h2>
      {root ? (
        <svg
          className="visualizer-svg"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
        >
          <Node node={root} positions={positions} parentPosition={null} />
        </svg>
      ) : (
        <p className="empty-tree-message">El árbol está vacío.</p>
      )}
    </div>
  );
}