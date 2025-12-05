// src/components/TopTaskCard.jsx
import { motion } from 'framer-motion';
import './TopTaskCard.css';

export function TopTaskCard({ task, onPop }) {
  return (
    <div className="top-task-card">
      <h2 className="top-task-title">Tarea de Mayor Prioridad</h2>
      {task ? (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="top-task-description">{task.description}</p>
          <p className="top-task-details">Vence: {task.dueDate}</p>
          <p className="top-task-details">Prioridad: {task.priority === 3 ? 'Alta' : task.priority === 2 ? 'Media' : 'Baja'}</p>
          <button
            onClick={onPop}
            aria-label="Eliminar la tarea de mayor prioridad"
            className="pop-task-button"
          >
            Eliminar Tarea Superior
          </button>
        </motion.div>
      ) : (
        <p className="no-tasks-message">No hay tareas disponibles.</p>
      )}
    </div>
  );
}
