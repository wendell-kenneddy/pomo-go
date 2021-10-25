import styles from './styles.module.scss';

interface ProgressBarProps {
  backgroundColor: string;
  width: string;
}

export function ProgressBar({ width, backgroundColor }: ProgressBarProps) {
  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.progressBar} style={{ backgroundColor, width }}></div>
    </div>
  );
}
