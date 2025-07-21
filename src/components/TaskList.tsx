import React from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import styles from './TaskList.module.css';


interface TaskListProps {
  categoryFilter?: string[];
}

const TaskList: React.FC<TaskListProps> = ({ categoryFilter = [] }) => {
  const { tasks, toggleTaskComplete, deleteTask } = useTasks();
  const navigate = useNavigate();

  const handleToggleComplete = (id: string) => {
    toggleTaskComplete(id);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleUpdate = (id: string) => {
    navigate(`/task/${id}`);
  };

  const filteredTasks = categoryFilter.length > 0 
    ? tasks.filter(task => categoryFilter.includes(task.category))
    : tasks;

  if (filteredTasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tasks found!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          category={task.category}
          isCompleted={task.isCompleted}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;