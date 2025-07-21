import { ReactComponent as HeaderIcon } from '../assets/icons/header-icon.svg';
import LightDarkSwitch from './LightDarkSwitch';
import { useTheme } from '../context/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <HeaderIcon className={styles.logo} />
        <span className={styles.title}>Task Manager</span>
      </div>
      <LightDarkSwitch theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;