import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import styles from './LightDarkSwitch.module.css';

interface LightDarkSwitchProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const LightDarkSwitch: React.FC<LightDarkSwitchProps> = ({ theme, toggleTheme }) => (
  <div className={styles.switchContainer} onClick={toggleTheme} title="Toggle light/dark mode">
    <LightModeIcon className={`${styles.icon} ${theme === 'light' ? styles.active : styles.inactive}`} />
    <NightlightRoundIcon className={`${styles.icon} ${theme === 'dark' ? styles.active : styles.inactive}`} />
  </div>
);

export default LightDarkSwitch;