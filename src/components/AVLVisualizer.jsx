// src/components/AVLVisualizer.jsx
import { useState, useMemo, useRef } from 'react';
import './AVLVisualizer.css';

const NODE_RADIUS = 6;
const LEVEL_HEIGHT = 25;
const HORIZONTAL_GAP = 6;
const PADDING = 20;

// ... (calculatePositions and Node component remain the same)
function calculatePositions(node, level = 0, xOffset = 0, positions = {}) {
  if (!node) {
    return { positions, width: 0 };
  }
  const left = calculatePositions(node.left, level + 1, xOffset, positions);
  const leftWidth = left.width;
  const nodeX = xOffset + leftWidth + (leftWidth > 0 ? HORIZONTAL_GAP : 0);
  positions[node.key] = {
    x: nodeX + NODE_RADIUS,
    y: level * LEVEL_HEIGHT + NODE_RADIUS,
  };
  const rightX = nodeX + NODE_RADIUS * 2;
  const right = calculatePositions(node.right, level + 1, rightX + (leftWidth > 0 ? HORIZONTAL_GAP : 0), positions);
  const rightWidth = right.width;
  const totalWidth = leftWidth + (leftWidth > 0 ? HORIZONTAL_GAP : 0) +
                     NODE_RADIUS * 2 +
                     (rightWidth > 0 ? HORIZONTAL_GAP : 0) + rightWidth;
  return { positions, width: totalWidth };
}

const Node = ({ node, positions, parentPosition }) => {
  if (!node) return null;
  const pos = positions[node.key];
  const priorityClassName = `priority-${node.task.priority}`;
  return (
    <g>
      {parentPosition && (
        <line
          x1={parentPosition.x}
          y1={parentPosition.y}
          x2={pos.x}
          y2={pos.y}
          className="node-line"
        />
      )}
      <Node node={node.left} positions={positions} parentPosition={pos} />
      <Node node={node.right} positions={positions} parentPosition={pos} />
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
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isPanning = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const { positions, initialViewBox } = useMemo(() => {
    if (!root) {
      return { positions: {}, initialViewBox: { x: 0, y: 0, width: 100, height: 100 } };
    }
    const { positions } = calculatePositions(root);
    let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const key in positions) {
      const pos = positions[key];
      minX = Math.min(minX, pos.x - NODE_RADIUS);
      maxX = Math.max(maxX, pos.x + NODE_RADIUS);
      maxY = Math.max(maxY, pos.y + NODE_RADIUS);
    }
    const width = maxX - minX + PADDING * 2;
    const height = maxY + PADDING * 2;
    return { positions, initialViewBox: { x: minX - PADDING, y: 0, width, height } };
  }, [root]);

  // Set initial viewbox when the tree changes
  useState(() => {
    setViewBox(initialViewBox);
  }, [initialViewBox]);

  const getPoint = (e) => {
    const CTM = svgRef.current.getScreenCTM();
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const onMouseDown = (e) => {
    isPanning.current = true;
    lastPoint.current = getPoint(e);
  };

  const onMouseMove = (e) => {
    if (!isPanning.current) return;
    const point = getPoint(e);
    setViewBox(vb => ({
      ...vb,
      x: vb.x - (point.x - lastPoint.current.x),
      y: vb.y - (point.y - lastPoint.current.y)
    }));
  };

  const onMouseUp = () => {
    isPanning.current = false;
  };

  const onWheel = (e) => {
    e.preventDefault();
    const { x, y } = getPoint(e);
    const scale = e.deltaY > 0 ? 1.1 : 0.9;
    const newWidth = viewBox.width * scale;
    const newHeight = viewBox.height * scale;
    setViewBox({
      x: viewBox.x + (x - viewBox.x) * (1 - scale),
      y: viewBox.y + (y - viewBox.y) * (1 - scale),
      width: newWidth,
      height: newHeight,
    });
  };

  return (
    <div className={`visualizer-container ${isPanning.current ? 'panning' : ''}`}>
      <h2 className="visualizer-title">Visualización del Árbol AVL</h2>
      {root ? (
        <svg
          ref={svgRef}
          className="visualizer-svg"
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp} // Stop panning if mouse leaves SVG
          onWheel={onWheel}
        >
          <Node node={root} positions={positions} parentPosition={null} />
        </svg>
      ) : (
        <p className="empty-tree-message">El árbol está vacío.</p>
      )}
    </div>
  );
}
