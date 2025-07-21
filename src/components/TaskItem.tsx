import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getCategoryIconStyle } from '../utils/categoryStyles';
import { CustomCheckbox } from '../utils/checkboxIcons';
import { analytics } from '../utils/analytics';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  id: string;
  title: string;
  category: string;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const categoryIcons = {
  pet: <PetsIcon fontSize="small" />,
  personal: <ManageAccountsIcon fontSize="small" />,
  selfcare: <MenuBookIcon fontSize="small" />,
  shop: <ShoppingCartIcon fontSize="small" />,
  work: <WorkIcon fontSize="small" />,
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  category,
  isCompleted,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
    setIsSliding(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setSlideOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const deltaX = touchStartX - currentX;
    
    if (deltaX > 50) {
      setIsSliding(true);
    } else {
      setIsSliding(false);
    }
  };

  const handleFocus = () => {
    if (isMobile) {
      setIsHovered(false);
    }
  };


  return (
    <div 
      className={`${styles.taskCard} ${isSliding ? styles.sliding : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onFocus={handleFocus}
      tabIndex={-1}
    >
      <div className={styles.taskContent}>
        <CustomCheckbox
          checked={isCompleted}
          onChange={() => {
            onToggleComplete(id);
            analytics.actions.complete(id);
          }}
        />
        <div style={{
          ...getCategoryIconStyle(category),
          width: '40px',
          height: '40px',
        }}>
          {React.cloneElement(categoryIcons[category as keyof typeof categoryIcons], {
            fontSize: 'large',
            sx: { fontSize: '32px' }
          })}
        </div>
        <div className={styles.textContent}>
          <span className={styles.categoryLabel}>{category}</span>
          <span className={`${styles.taskTitle} ${isCompleted ? styles.completed : ''}`}>
            {title}
          </span>
        </div>
      </div>
      
      {(isHovered || isSliding) && (
        <div className={styles.actionButtons}>
          <button 
            className={styles.actionButton}
            onClick={() => {
              onUpdate(id);
              analytics.actions.editTask(id);
            }}
            title="Edit task"
          >
            <EditIcon fontSize="small" />
          </button>
          <button 
            className={styles.actionButton}
            onClick={() => {
              onDelete(id);
              analytics.actions.delete(id);
            }}
            title="Delete task"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;