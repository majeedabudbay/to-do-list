import React from 'react';
import CustomSelect from './styled/CustomSelect';

interface DropdownProps {
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

const Dropdown: React.FC<DropdownProps> = (props) => {
  return <CustomSelect {...props} />;
};

export default Dropdown;