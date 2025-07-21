import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '../../context/ThemeContext';

const StyledMarkCompletedButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ theme, isDark }) => ({
  flex: 1,
  height: 49,
  borderRadius: '12px',
  border: '1px solid #5F33E1',
  background: 'transparent',
  color: isDark ? '#FFFFFF' : '#24252C',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    background: 'rgba(95, 51, 225, 0.1)',
  },
}));

interface MarkCompletedButtonProps extends Omit<ButtonProps, 'startIcon'> {
  onClick: () => void;
}

const MarkCompletedButton: React.FC<MarkCompletedButtonProps> = ({ onClick, ...props }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <StyledMarkCompletedButton
      variant="outlined"
      onClick={onClick}
      startIcon={<CheckIcon />}
      isDark={isDark}
      {...props}
    >
      Mark as completed
    </StyledMarkCompletedButton>
  );
};

export default MarkCompletedButton; 