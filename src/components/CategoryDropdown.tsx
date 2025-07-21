import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WorkIcon from '@mui/icons-material/Work';
import Dropdown from './Dropdown';
import { getCategoryIconStyle } from '../utils/categoryStyles';
import { CustomCheckedIcon, CustomUncheckedIcon } from '../utils/checkboxIcons';
import { VALID_CATEGORIES } from '../constants/categories';
import styles from './CategoryDropdown.module.css';


interface CategoryDropdownProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  sx?: any;
  error?: boolean;
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'pet': return { label: 'Pet', icon: <PetsIcon fontSize="small" /> };
    case 'personal': return { label: 'Personal', icon: <ManageAccountsIcon fontSize="small" /> };
    case 'selfcare': return { label: 'Self Care', icon: <MenuBookIcon fontSize="small" /> };
    case 'shop': return { label: 'Shop', icon: <ShoppingCartIcon fontSize="small" /> };
    case 'work': return { label: 'Work', icon: <WorkIcon fontSize="small" /> };
    default: return { label: category, icon: <WorkIcon fontSize="small" /> };
  }
};

const categories = VALID_CATEGORIES.map(category => ({
  value: category,
  ...getCategoryConfig(category)
}));


const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ value, onChange, multiple, placeholder = "Filter", sx, error }) => (
  <Dropdown
    placeholder={placeholder}
    options={categories}
    value={value}
    onChange={onChange}
    error={error}

    renderOption={(option) => {
      const isSelected = multiple 
        ? Array.isArray(value) && value.includes(option.value)
        : value === option.value;
        
      return (
        <div className={styles.optionContainer}>
          {multiple && (
            isSelected ? (
              <CustomCheckedIcon />
            ) : (
              <CustomUncheckedIcon />
            )
          )}
          <div style={getCategoryIconStyle(option.value)}>
            {option.icon}
          </div>
          <span className={multiple ? styles.optionLabelWithMargin : styles.optionLabel}>{option.label}</span>
        </div>
      );
    }}
    renderValue={(selected) => {
      const selectedValues = Array.isArray(selected) ? selected : [selected];
      if (!selectedValues.length || selectedValues[0] === '') {
        return (
          <span className={styles.placeholder}>
            {placeholder}
          </span>
        );
      }

      const selectedCategories = categories.filter(opt => selectedValues.includes(opt.value));
      
      if (selectedCategories.length === 1) {
        const opt = selectedCategories[0];
        const iconStyle = getCategoryIconStyle(opt.value);
        return (
          <span className={styles.selectedValueContainer}>
            <div style={iconStyle}>
              {opt.icon}
            </div>
            <span className={styles.placeholder}>{opt.label}</span>
          </span>
        );
      } else {
        return (
          <span className={styles.selectedCount}>
            {selectedCategories.length} selected
          </span>
        );
      }
    }}
    multiple={multiple}
    sx={sx}
  />
);

export default CategoryDropdown;
