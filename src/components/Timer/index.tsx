import { useClock } from '../../hooks/useClock';
import { TimeData } from '../../utils/TimeData';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import styles from './styles.module.scss';

const timeData = new TimeData();

export function Timer() {
  const { currentTime, totalTime, isRunning, startTimer, stopTimer } =
    useClock();
  const progressBarWidth = `${Math.round((currentTime * 100) / totalTime)}%`;

  return (
    <main className={styles.timerWrapper}>
      <span className={styles.timerClock}>
        {timeData.getMinutes(currentTime)}
      </span>
      <ProgressBar width={progressBarWidth} backgroundColor="#ff7a29" />
      <Button
        title={isRunning ? 'Parar' : 'Começar'}
        width="60%"
        backgroundColor="var(--gray-quarternary)"
        textColor="#fff"
        isBig={true}
        onClick={isRunning ? stopTimer : startTimer}
      />
    </main>
  );
}
