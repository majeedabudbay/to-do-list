import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSaveButton = styled(Button)(({ theme }) => ({
  flex: 1,
  height: 49,
  borderRadius: '12px',
  background: '#5F33E1',
  color: '#fff',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    background: '#4722b6',
  },
}));

interface SaveButtonProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode;
}

const SaveButton: React.FC<SaveButtonProps> = ({ children, ...props }) => {
  return (
    <StyledSaveButton
      type="submit"
      variant="contained"
      {...props}
    >
      {children}
    </StyledSaveButton>
  );
};

export default SaveButton; 