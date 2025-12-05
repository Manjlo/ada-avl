// src/components/TaskList.jsx
import { motion } from 'framer-motion';
import './TaskList.css';

const priorityMap = {
  1: { text: 'Baja', className: 'priority-low' },
  2: { text: 'Media', className: 'priority-medium' },
  3: { text: 'Alta', className: 'priority-high' },
};

export function TaskList({ tasks, onComplete }) {
  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Todas las Tareas ({tasks.length})</h2>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="task-item"
            >
              <div className="task-details">
                <p className="task-description">{task.description}</p>
                <p className="task-due-date">Vence: {task.dueDate}</p>
              </div>
              <div className="task-actions">
                <span
                  className={`priority-badge ${
                    priorityMap[task.priority]?.className || 'priority-unknown'
                  }`}
                >
                  {priorityMap[task.priority]?.text || 'Desconocida'}
                </span>
                <button
                  onClick={() => onComplete(task.id)}
                  aria-label={`Marcar tarea "${task.description}" como completada`}
                  className="complete-button"
                >
                  Completar
                </button>
              </div>
            </motion.li>
          ))
        ) : (
          <p className="no-tasks">Aún no hay tareas. ¡Añade una arriba!</p>
        )}
      </ul>
    </div>
  );
}
