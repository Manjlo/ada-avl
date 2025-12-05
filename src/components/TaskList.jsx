// src/components/TaskList.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import './TaskList.css';

const priorityMap = {
  1: { text: 'Baja', className: 'priority-low' },
  2: { text: 'Media', className: 'priority-medium' },
  3: { text: 'Alta', className: 'priority-high' },
};

// Componente para el formulario de edición en línea
function EditTaskForm({ task, onSave, onCancel }) {
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSave = () => {
    onSave(task.id, { priority: Number(priority), dueDate });
  };

  return (
    <div className="edit-form">
      <div className="edit-fields">
        <label>
          Prioridad:
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="edit-select">
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
          </select>
        </label>
        <label>
          Vence:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="edit-input" />
        </label>
      </div>
      <div className="edit-actions">
        <button onClick={handleSave} className="save-button">Guardar</button>
        <button onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
}

export function TaskList({ tasks, onComplete, onUpdate }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleSave = (taskId, updates) => {
    onUpdate(taskId, updates);
    setEditingTaskId(null); // Salir del modo de edición
  };

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
              {editingTaskId === task.id ? (
                <EditTaskForm task={task} onSave={handleSave} onCancel={() => setEditingTaskId(null)} />
              ) : (
                <>
                  <div className="task-details">
                    <p className="task-description">
                      {task.description}
                      <span className="task-id" title={`ID Completo: ${task.id}`}>
                        (ID: ...{String(task.id).slice(-5)})
                      </span>
                    </p>
                    <p className="task-due-date">Vence: {task.dueDate}</p>
                  </div>
                  <div className="task-actions">
                    <span className={`priority-badge ${priorityMap[task.priority]?.className || 'priority-unknown'}`}>
                      {priorityMap[task.priority]?.text || 'Desconocida'}
                    </span>
                    <button onClick={() => setEditingTaskId(task.id)} className="edit-button">Editar</button>
                    <button onClick={() => onComplete(task.id)} className="complete-button">Completar</button>
                  </div>
                </>
              )}
            </motion.li>
          ))
        ) : (
          <p className="no-tasks">Aún no hay tareas. ¡Añade una arriba!</p>
        )}
      </ul>
    </div>
  );
}