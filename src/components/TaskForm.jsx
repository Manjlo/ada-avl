// src/components/TaskForm.jsx
import { useState } from 'react';
import './TaskForm.css';

export function TaskForm({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !dueDate) {
      alert('Por favor, rellene todos los campos.');
      return;
    }
    onSubmit({ description, priority: Number(priority), dueDate });
    setDescription('');
    setPriority(2);
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="task-form-title">Añadir Nueva Tarea</h2>
      <div className="form-grid">
        <div className="description-field">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            placeholder="¿Qué se necesita hacer?"
          />
        </div>
        <div>
          <label htmlFor="priority" className="form-label">
            Prioridad
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="form-label">
            Fecha de Vencimiento
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
          />
        </div>
      </div>
      <button
        type="submit"
        aria-label="Añadir nueva tarea"
        className="submit-button"
      >
        Añadir Tarea
      </button>
    </form>
  );
}
