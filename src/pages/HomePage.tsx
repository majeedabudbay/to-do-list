import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryDropdown from '../components/CategoryDropdown';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';
import { analytics } from '../utils/analytics';
import styles from './HomePage.module.css';
import NewTaskButton from '../components/styled/NewTaskButton';


const HomePage = () => {
  const [category, setCategory] = useState<string[]>([]);
  const { tasks } = useTasks();
  const inProgressCount = tasks.filter(task => !task.isCompleted).length;
  const completedCount = tasks.filter(task => task.isCompleted).length;
  const navigate = useNavigate();


  const hasLogged = React.useRef(false);
  useEffect(() => {
    if (!hasLogged.current) {
      analytics.pageVisit.home();
      hasLogged.current = true;
    }
  }, []);

  const handleNewTask = () => {
    analytics.actions.addItem();
    navigate('/task');
  };

  return (

    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.filterRow}>
          <div className={styles.inProgress}>
            In Progress
            <span className={styles.inProgressCount}>{inProgressCount}</span>
          </div>
          <CategoryDropdown
            placeholder="Filter"
            value={category}
            onChange={val => Array.isArray(val) && setCategory(val)}
            multiple={true}
          />
        </div>
      </section>

    
      <section className={styles.section}>
        <TaskList categoryFilter={category} />
      </section>


      <section className={styles.section}>
        <div className={styles.completedRow}>
          <div className={styles.completed}>
            Completed
            <span className={styles.completedCount}>{completedCount}</span>
          </div>
        </div>
      </section>

      
      <section>
        <NewTaskButton onClick={handleNewTask} />
      </section>
      
    </main>
  );
};

export default HomePage;