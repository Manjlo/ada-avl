// src/App.jsx
import { useTaskManager } from './hooks/useTaskManager';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TopTaskCard } from './components/TopTaskCard';
import { AVLVisualizer } from './components/AVLVisualizer';
import './App.css';

function App() {
  const {
    tasksList,
    avlRoot,
    addTask,
    completeTask,
    getTopTask,
    popTopTask,
  } = useTaskManager();

  const topTask = getTopTask();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          Gestor de Tareas Pro
        </h1>
        <p className="app-subtitle">
          Tu espacio de trabajo personal, impulsado por estructuras de datos avanzadas.
        </p>
      </header>

      <main className="main-content">
        <div className="left-column">
          <TaskForm onSubmit={addTask} />
          <TopTaskCard task={topTask} onPop={popTopTask} />
          <TaskList tasks={tasksList} onComplete={completeTask} />
        </div>

        <div className="right-column">
          <AVLVisualizer root={avlRoot} />
        </div>
      </main>
    </div>
  );
}

export default App;