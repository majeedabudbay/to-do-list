import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)<{ error?: boolean }>(({ error }) => ({
  width: 335,
  height: 49,

  '& .MuiInputBase-input.Mui-error::placeholder': {
    color: 'var(--text-color) !important',
    opacity: 1,
  },
  '& .MuiOutlinedInput-root': {
    height: '100%',
    padding: '12px',
    borderRadius: '12px',
    background: 'var(--component-bg-color)',
    border: error ? '1px solid #D30136' : '1px solid var(--border-color, #e0e0e0)',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 16,
    color: 'var(--text-color)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    '&:hover': {
      borderColor: error ? '#D30136' : '#5F33E1',
    },
    '&.Mui-focused': {
      borderColor: error ? '#D30136' : '#5F33E1',
      border: error ? '1px solid #D30136' : '1px solid #5F33E1',
    },
    '& fieldset': { border: 'none' },
    '&.Mui-error': {
      border: '1px solid #D30136 !important',
      '&:hover': {
        border: '1px solid #D30136 !important',
      },
      '&.Mui-focused': {
        border: '1px solid #D30136 !important',
      },
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeight: 500,
    fontSize: 16,
    color: 'var(--text-color) !important',
    paddingTop: '20px',
    paddingLeft: 'unset',
    '&::placeholder': {
      color: 'var(--text-color) !important',
      opacity: 1,
    },
  },
  '& .MuiInputBase-input.Mui-error': {
    '&::placeholder': {
      color: 'var(--text-color) !important',
      opacity: 1,
    },
  },
  '& input': {
    color: 'var(--text-color) !important',
  },
  '& .MuiInputLabel-root': {
    color: 'var(--text-color)',
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeight: 500,
    fontSize: 14,
    paddingTop: '10px'
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'Inter, Arial, sans-serif !important',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '100%',
    marginLeft: '12px',
    marginTop: '12px',
    color: 'var(--text-color)',
  },
      '& .MuiFormHelperText-root.Mui-error': {
      color: '#D30136 !important',
    }
}));

interface TaskTextFieldProps extends Omit<TextFieldProps, 'error'> {
  error?: boolean;
}

const TaskTextField: React.FC<TaskTextFieldProps> = ({ error, ...props }) => {
  return (
    <StyledTextField
      error={error}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};

export default TaskTextField; 