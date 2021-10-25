import styles from './styles.module.scss';
import logo from '../../assets/logo.svg';
import { FiSettings } from 'react-icons/fi';
import { useClock } from '../../hooks/useClock';

export function Header() {
  const { changeIsConfiguring } = useClock();

  return (
    <header className={styles.headerWrapper}>
      <img src={logo} alt="Logo" width="70" />

      <FiSettings
        size="24px"
        color="#8d8d99"
        onClick={() => changeIsConfiguring()}
      />
    </header>
  );
}
