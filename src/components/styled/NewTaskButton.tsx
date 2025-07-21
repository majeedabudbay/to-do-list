import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const StyledNewTaskButton = styled(Button)(({ theme }) => ({
  width: 335,
  height: 36,
  paddingTop: '8px',
  paddingRight: '12px',
  paddingBottom: '8px',
  paddingLeft: '12px',
  borderRadius: '8px',
  background: '#5F33E1',
  boxShadow: '0px 1px 6px 0px #0000001F',
  color: '#fff',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  '& .MuiButton-startIcon': {
    marginRight: '5px',
  },
  '&:hover': {
    background: '#4722b6',
  },
}));

interface NewTaskButtonProps extends Omit<ButtonProps, 'startIcon'> {
  onClick: () => void;
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({ onClick, ...props }) => {
  return (
    <StyledNewTaskButton
      onClick={onClick}
      startIcon={<AddIcon />}
      variant="contained"
      disableElevation
      {...props}
    >
      New Task
    </StyledNewTaskButton>
  );
};

export default NewTaskButton; 