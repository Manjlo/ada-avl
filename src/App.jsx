// src/App.jsx
import { useTaskManager } from "./hooks/useTaskManager";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TopTaskCard } from "./components/TopTaskCard";
import { AVLVisualizer } from "./components/AVLVisualizer";
import { AVLSearchTester } from "./components/AVLSearchTester";
import "./App.css";

function App() {
  const {
    tasksList,
    avlRoot,
    addTask,
    completeTask,
    getTopTask,
    popTopTask,
    updateTask,
    findTask,
  } = useTaskManager();

  const topTask = getTopTask();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Gestor de Tareas ADA</h1>
      </header>

      <main className="main-content">
        <div className="left-column">
          <TaskForm onSubmit={addTask} />
          <TopTaskCard task={topTask} onPop={popTopTask} />
          <TaskList
            tasks={tasksList}
            onComplete={completeTask}
            onUpdate={updateTask}
          />
        </div>

        <div className="right-column">
          <AVLVisualizer root={avlRoot} />
          <AVLSearchTester tasks={tasksList} onSearch={findTask} />
        </div>
      </main>
    </div>
  );
}

export default App;

