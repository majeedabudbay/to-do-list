import CheckIcon from '@mui/icons-material/Check';

export const CustomUncheckedIcon = () => (
  <div style={{
    width: 24,
    height: 24,
    gap: '7.5px',
    opacity: 1,
    borderRadius: '6px',
    border: '0.75px solid #00AB56',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }} />
);

export const CustomCheckedIcon = () => (
  <div style={{
    width: 24,
    height: 24,
    gap: '7.5px',
    opacity: 1,
    borderRadius: '6px',
    backgroundColor: '#00AB56',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <CheckIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
  </div>
);

export const CustomCheckbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div 
    onClick={onChange}
    style={{
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {checked ? <CustomCheckedIcon /> : <CustomUncheckedIcon />}
  </div>
); 