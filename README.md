# Task Management Application

A modern, responsive task management application built with React, TypeScript, and Material-UI. Features include task creation, editing, completion tracking, category filtering, and theme switching.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as completed
- **Category Filtering**: Filter tasks by categories (pet, personal, selfcare, shop, work)
- **Theme Support**: Light and dark mode with smooth transitions
- **Data Persistence**: Tasks are saved to localStorage
- **Form Validation**: Comprehensive error handling and validation
- **Analytics**: User interaction tracking for better UX insights

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd tictuk-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
src/
├── components/
│   ├── styled/           # Styled components
│   │   ├── CustomSelect.tsx
│   │   ├── DeleteButton.tsx
│   │   ├── MarkCompletedButton.tsx
│   │   ├── NewTaskButton.tsx
│   │   ├── SaveButton.tsx
│   │   └── TaskTextField.tsx
│   ├── CategoryDropdown.tsx
│   ├── Dropdown.tsx
│   ├── Header.tsx
│   └── TaskItem.tsx
├── context/
│   ├── TaskContext.tsx   # Task state management
│   └── ThemeContext.tsx  # Theme state management
├── pages/
│   ├── HomePage.tsx      # Main task list page
│   └── TaskManagementPage.tsx
├── utils/
│   ├── analytics.ts      # Analytics tracking
│   ├── validation.ts     # Form validation
│   └── checkboxIcons.tsx
├── constants/
│   └── categories.ts     # Category definitions
└── App.tsx              # Main application component
```

## Available Scripts

- `npm start` - Runs the app in development mode

## Design System

### Colors
- **Primary**: `#5F33E1` (Purple)
- **Error**: `#D30136` (Red)
- **Background**: CSS variables for theme support
- **Text**: Theme-aware text colors

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

## Technical Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **CSS Modules** - Component styling
- **Styled Components** - Advanced styling
- **LocalStorage** - Data persistence

## Usage Guide

### Creating a Task
1. Click "New Task" button on the home page
2. Select a category from the dropdown
3. Enter task name in the text field
4. Click "Save new Task"

### Editing a Task
1. Click on any task item to edit
2. Modify category or task name
3. Click "Save changes" to update

### Completing a Task
1. Open task for editing
2. Click "Mark as completed" button
3. Task will move to completed section

### Filtering Tasks
1. Use the category dropdown on the home page
2. Select a category to filter tasks
3. View filtered results instantly

### Switching Themes
1. Click the theme toggle in the header
2. Switch between light and dark modes
3. Theme preference is saved automatically

## 📊 Analytics

The application includes analytics tracking for:
- Page navigation
- Task creation
- Task deletion
- Task updates
- Task completion

Analytics data is logged to the console for development purposes.