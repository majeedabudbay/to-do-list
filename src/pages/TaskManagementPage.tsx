import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CategoryDropdown from '../components/CategoryDropdown';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import { validateTaskForm, hasValidationErrors, ValidationError } from '../utils/validation';
import { analytics } from '../utils/analytics';
import SaveButton from '../components/styled/SaveButton';
import MarkCompletedButton from '../components/styled/MarkCompletedButton';
import TaskTextField from '../components/styled/TaskTextField';
import DeleteButton from '../components/styled/DeleteButton';
import styles from './TaskManagementPage.module.css';


const TaskManagementPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addTask, updateTask, deleteTask, tasks } = useTasks();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState<ValidationError>({});
    const isEditing = !!id;
    const existingTask = isEditing ? tasks.find(task => task.id === id) : null;
    const hasLogged = React.useRef(false);


    useEffect(() => {
        if (!hasLogged.current) {
            analytics.pageVisit.taskManagement();
            hasLogged.current = true;
        }
    }, []);

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title);
            setCategory(existingTask.category);
        }
    }, [existingTask]);

        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors = validateTaskForm({ title, category });
        if (hasValidationErrors(newErrors)) {
            setErrors(newErrors);
            return;
        }
        if (isEditing && existingTask) {
            updateTask(id, {
                title: title.trim(),
                category,
            });
            analytics.actions.saveTask(id);
        } else {
            const newTask = {
                id: Date.now().toString(),
                title: title.trim(),
                category,
                isCompleted: false,
            };
            addTask(newTask);
            analytics.actions.addItem();
        }
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>
                    <KeyboardBackspaceIcon sx={{ color: '#5F33E1' }} />
                    <span>Back</span>
                </button>
            </div>

            <h1 className={styles.title}>
                {isEditing ? 'Edit Task' : 'Create New Task'}
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <CategoryDropdown
                        placeholder="Select category"
                        value={category}
                        onChange={(val) => {
                            if (typeof val === 'string') {
                                setCategory(val);
                            }
                        }}
                        multiple={false}
                        error={!!errors.category}
                    />
                    {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>
                <div className={styles.formGroup}>
                    <TaskTextField
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Name your task"
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </div>


                <div className={styles.buttonGroup}>
                    {isEditing && (
                        <>
                            <div className={styles.deleteButtonContainer}>
                                <DeleteButton
                                    onClick={() => {
                                        if (existingTask) {
                                            deleteTask(id);
                                            analytics.actions.delete(id);
                                            navigate('/');
                                        }
                                    }}
                                    isDark={isDark}
                                />
                            </div>
                            <div className={styles.buttonColumn}>
                                <SaveButton>
                                    Save changes
                                </SaveButton>
                                <MarkCompletedButton
                                    onClick={() => {
                                        if (existingTask) {
                                            updateTask(id, { ...existingTask, isCompleted: !existingTask.isCompleted });
                                            analytics.actions.complete(id);
                                        }
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {!isEditing && (
                        <SaveButton sx={{ width: '100%' }}>
                            Save new Task
                        </SaveButton>
                    )}
                </div>
            </form>
        </div>
    );
}

export default TaskManagementPage;