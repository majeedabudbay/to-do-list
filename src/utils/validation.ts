import { VALID_CATEGORIES } from '../constants/categories';

export interface ValidationError {
  title?: string;
  category?: string;
}

export interface TaskFormData {
  title: string;
  category: string;
}

export const validateTaskForm = (data: TaskFormData): ValidationError => {
  const errors: ValidationError = {};

  if (!data.title.trim()) {
    errors.title = 'Task title is required';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Task title must be at least 3 characters long';
  } else if (data.title.trim().length > 100) {
    errors.title = 'Task title must be less than 100 characters';
  }

  
  if (!data.category) {
    errors.category = 'Please select a category';
  } else if (!VALID_CATEGORIES.includes(data.category as any)) {
    errors.category = 'Please select a valid category';
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationError): boolean => {
  return Object.keys(errors).length > 0;
};