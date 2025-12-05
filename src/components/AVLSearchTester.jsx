// src/components/AVLSearchTester.jsx
import { useState } from 'react';
import './AVLSearchTester.css';

export function AVLSearchTester({ tasks, onSearch }) {
  const [searchResult, setSearchResult] = useState(null);
  const [searchTime, setSearchTime] = useState(0);

  const handleRandomSearch = () => {
    if (tasks.length === 0) {
      alert('No hay tareas para buscar.');
      return;
    }

    // 1. Seleccionar un ID de tarea aleatorio
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[randomIndex];
    const randomId = randomTask.id;

    // 2. Medir el tiempo de búsqueda
    const startTime = performance.now();
    const foundTask = onSearch(randomId);
    const endTime = performance.now();

    const duration = endTime - startTime;

    // 3. Actualizar el estado para mostrar el resultado
    setSearchResult(foundTask);
    setSearchTime(duration);
  };

  return (
    <div className="search-tester-container">
      <h3 className="search-tester-title">Prueba de Indexación AVL</h3>
      <p className="search-tester-description">
        Haz clic en el botón para buscar una tarea con un ID aleatorio en el Árbol AVL y medir el tiempo de respuesta.
      </p>
      <button onClick={handleRandomSearch} className="search-button">
        Buscar Tarea Aleatoria
      </button>

      {searchResult && (
        <div className="search-result">
          <h4>Resultado de la Búsqueda:</h4>
          <p>
            Se buscó el ID: <span className="result-id">{searchResult.id}</span>
          </p>
          <p>
            Tarea encontrada: <span className="result-desc">"{searchResult.description}"</span>
          </p>
          <p>
            Tiempo de respuesta: <span className="result-time">{searchTime.toFixed(4)} ms</span>
          </p>
        </div>
      )}
    </div>
  );
}
