import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '../../context/ThemeContext';
import { CustomCheckbox } from '../../utils/checkboxIcons';

interface CustomSelectProps {
  placeholder?: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  renderOption?: (option: any) => React.ReactNode;
  multiple?: boolean;
  renderValue?: (selected: any) => React.ReactNode;
  sx?: any;
  error?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  renderOption,
  multiple = false,
  renderValue,
  sx,
  error = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <FormControl 
      fullWidth 
      size="small" 
      variant="outlined" 
      sx={{
        ...sx,
        '& .MuiOutlinedInput-root': {
          backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
          borderRadius: '8px !important',
          border: error ? '1px solid #D30136 !important' : '1px solid var(--border-color, #e0e0e0)',
          '&:hover': {
            borderColor: error ? '#D30136 !important' : '#5F33E1 !important',
          },
          '&.Mui-focused': {
            border: error ? '1px solid #D30136 !important' : '1px solid #5F33E1 !important',
          },
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
        '& .MuiSelect-icon': {
          color: isDark ? '#FFFFFF !important' : '#5F33E1 !important',
        },
      }}
    >
      <Select
        multiple={multiple}
        value={value}
        onChange={e => onChange(e.target.value)}
        displayEmpty
        renderValue={renderValue}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
              '& .MuiList-root-MuiMenu-list': {
                backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
              },
              '& .MuiMenuItem-root': {
                backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
                color: isDark ? '#FFFFFF !important' : '#24252C !important',
                '&:hover': {
                  backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
                  color: isDark ? '#FFFFFF !important' : '#24252C !important',
                },
                '&.Mui-selected': {
                  backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
                  color: isDark ? '#FFFFFF !important' : '#24252C !important',
                  '&:hover': {
                    backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
                    color: isDark ? '#FFFFFF !important' : '#24252C !important',
                  },
                },
              },
            },
          },
          sx: {
            '& .MuiPaper-root': {
              backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
            },
            '& .MuiList-root': {
              backgroundColor: isDark ? '#342F65 !important' : '#FFFFFF !important',
            },
          },
        }}
      >
        {options.map(opt => {
          const isSelected = multiple 
            ? Array.isArray(value) && value.includes(opt.value)
            : value === opt.value;
            
          return (
            <MenuItem key={opt.value} value={opt.value}>
              {renderOption ? renderOption(opt) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {multiple && (
                    <CustomCheckbox 
                      checked={isSelected}
                      onChange={() => {}}
                    />
                  )}
                  {opt.icon && <span>{opt.icon}</span>}
                  <ListItemText primary={opt.label} />
                </div>
              )}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomSelect; 