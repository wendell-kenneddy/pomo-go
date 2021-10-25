import { ReactNode, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useForm } from '../../hooks/form';
import { useClock } from '../../hooks/useClock';
import styles from './styles.module.scss';

interface ConfigModalProps {
  children: ReactNode;
}

export function ConfigModal({ children }: ConfigModalProps) {
  const { changeIsConfiguring } = useClock();
  const { getNewConfig } = useForm();

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.configModal}>
        <div className={styles.configModalHeader}>
          <h2>Configurações</h2>

          <FiX
            size="24"
            color="#8d8d99"
            onClick={() => changeIsConfiguring(getNewConfig())}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
