import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledDeleteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark?: boolean }>(({ isDark }) => ({
  width: 40,
  height: 40,
  borderRadius: '8px',
  border: '1px solid #5F33E1',
  background: 'var(--bg-color)',
  color: isDark ? '#FFFFFF' : '#24252C',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.05)',
  },
}));

interface DeleteButtonProps extends Omit<IconButtonProps, 'children'> {
  onClick: () => void;
  isDark?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, isDark, ...props }) => {
  return (
    <StyledDeleteButton
      onClick={onClick}
      isDark={isDark}
      {...props}
    >
      <DeleteIcon fontSize="small" />
    </StyledDeleteButton>
  );
};

export default DeleteButton; 