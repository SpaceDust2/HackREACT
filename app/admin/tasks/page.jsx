'use client'
import { useState } from 'react';

const tasks = [
  {
    id: 1,
    title: 'Harvest grapes',
    description: 'Pick ripe grapes from the vineyard',
    status: 'In Progress',
    progress: 30,
    date: '2023-06-24',
  },
  {
    id: 2,
    title: 'Crush grapes',
    description: 'Extract juice from the harvested grapes',
    status: 'In Progress',
    progress: 50,
    date: '2023-06-25',
  },
  {
    id: 3,
    title: 'Ferment juice',
    description: 'Allow the grape juice to ferment',
    status: 'Not Started',
    progress: 0,
    date: '2023-06-26',
  },
  {
    id: 4,
    title: 'Age wine',
    description: 'Store the fermented wine in barrels for aging',
    status: 'Not Started',
    progress: 0,
    date: '2023-06-27',
  },
  // Добавьте другие задачи сюда
];

const Task = ({ task, onTaskClick, onTaskDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const { id, title, description, status, progress } = task;

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onTaskDelete(id);
  };

  return (
    <div className={`task ${expanded ? 'expanded' : ''}`}>
      <div className="task-header" onClick={handleClick}>
        <div className="task-title">{title}</div>
        <div className="task-status">{status}</div>
      </div>
      {expanded && (
        <div className="task-details">
          <div className="task-description">{description}</div>
          <div className="task-progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%`, backgroundColor: status === 'Completed' ? 'green' : 'blue' }}
            >
              {progress}%
            </div>
          </div>
          <div className="task-actions">
            <button className="task-action-button" onClick={onTaskClick}>
              Edit
            </button>
            <button className="task-action-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskList = ({ tasks, onTaskClick, onTaskDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onTaskClick={() => onTaskClick(task)} onTaskDelete={onTaskDelete} />
      ))}
    </div>
  );
};

const TaskForm = ({ onTaskAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      progress,
      date,
    };
    onTaskAdd(newTask);
    setTitle('');
    setDescription('');
    setStatus('In Progress');
    setProgress(0);
    setDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        required
      />
      <select value={status} onChange={(event) => setStatus(event.target.value)} required>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Not Started">Not Started</option>
      </select>
      <input
        type="number"
        min="0"
        max="100"
        value={progress}
        onChange={(event) => setProgress(parseInt(event.target.value))}
        placeholder="Progress"
        required
      />
      <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

const TaskPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [tasksList, setTasksList] = useState(tasks);

  const handleTaskClick = (task) => {
    console.log('Clicked task:', task);
    // Здесь можно отобразить подробную информацию о задаче или выполнить другую логику
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasksList.filter((task) => task.id !== taskId);
    setTasksList(updatedTasks);
  };

  const handleTaskAdd = (newTask) => {
    setTasksList([...tasksList, newTask]);
  };

  const filteredTasks = tasksList.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterDate) {
    const filteredDate = new Date(filterDate).toISOString().split('T')[0];
    return (
      <div>
        <div className="search-and-filter">
          <input type="text" placeholder="Search" onChange={(event) => setSearchTerm(event.target.value)} />
          <input type="date" onChange={(event) => setFilterDate(event.target.value)} />
        </div>
        <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} onTaskDelete={handleTaskDelete} />
        <TaskForm onTaskAdd={handleTaskAdd} />
      </div>
    );
  }

  return (
    <div>
      <div className="search-and-filter">
        <input type="text" placeholder="Search" onChange={(event) => setSearchTerm(event.target.value)} />
        <input type="date" onChange={(event) => setFilterDate(event.target.value)} />
      </div>
      <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} onTaskDelete={handleTaskDelete} />
      <TaskForm onTaskAdd={handleTaskAdd} />
    </div>
  );
};

const styles = `
.task {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task:hover {
  background-color: #eaeaea;
}

.task.expanded {
  background-color: #eaeaea;
}

.task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.task-title {
  font-weight: bold;
}

.task-status {
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  background-color: #888;
}

.task-details {
  margin-top: 10px;
}

.task-description {
  margin-bottom: 10px;
}

.task-progress-bar {
  height: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: blue;
  color: white;
  text-align: center;
  transition: width 0.3s ease;
}

.task-actions {
  margin-top: 10px;
}

.task-action-button {
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #888;
  color: white;
  margin-right: 5px;
}

.search-and-filter {
  margin-bottom: 10px;
}

.search-and-filter input {
  margin-right: 10px;
}
`;

const FullTaskPage = () => (
  <>
    <style jsx>{styles}</style>
    <TaskPage />
  </>
);

export default FullTaskPage;
