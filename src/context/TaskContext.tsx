import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

export interface Task {
    id: string;
    title: string;
    category: string;
    isCompleted: boolean;
    createdAt?: number;
    updatedAt?: number;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (id: string, task: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
    clearAllTasks: () => void;
    isLoading: boolean;
}

const validateTask = (task: any): task is Task => {
    return (
        typeof task === 'object' &&
        task !== null &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        typeof task.category === 'string' &&
        typeof task.isCompleted === 'boolean'
    );
};


const STORAGE_KEY = 'tasks';

const loadTasksFromStorage = (): Task[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (!stored) {
            return [];
        }

        const parsed = JSON.parse(stored);
        const tasks = parsed.data || parsed;
        if (Array.isArray(tasks)) {
            return tasks.filter(validateTask);
        }
        return [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
};

const saveTasksToStorage = (tasks: Task[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (fallbackError) {
            console.error('Failed to save tasks even with fallback:', fallbackError);
        }
    }
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTasks = () => {
            setIsLoading(true);
            try {
                const loadedTasks = loadTasksFromStorage();
                setTasks(loadedTasks);
            } catch (error) {
                console.error('Error initializing tasks:', error);
                setTasks([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => {
                saveTasksToStorage(tasks);
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [tasks, isLoading]);

    const addTask = useCallback((task: Task) => {
        const taskWithTimestamps = {
            ...task,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        setTasks((prevTasks) => [...prevTasks, taskWithTimestamps]);
    }, []);

    const updateTask = useCallback((id: string, task: Partial<Task>) => {
        setTasks((prevTasks) => prevTasks.map((t) => 
            t.id === id ? { ...t, ...task, updatedAt: Date.now() } : t
        ));
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    }, []);

    const toggleTaskComplete = useCallback((id: string) => {
        setTasks((prevTasks) => prevTasks.map((t) => 
            t.id === id ? { ...t, isCompleted: !t.isCompleted, updatedAt: Date.now() } : t
        ));
    }, []);

    const clearAllTasks = useCallback(() => {
        setTasks([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            addTask, 
            updateTask, 
            deleteTask, 
            toggleTaskComplete, 
            clearAllTasks,
            isLoading 
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}