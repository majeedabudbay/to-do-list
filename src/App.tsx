import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TaskManagementPage from './pages/TaskManagementPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/task" element={<TaskManagementPage />} />
              <Route path="/task/:id" element={<TaskManagementPage />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
