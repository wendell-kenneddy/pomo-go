import { useContext } from 'react';
import { ClockContext } from '../../hooks/useClock';
import { Button } from '../Button';
import styles from './styles.module.scss';

export function TimerControls() {
  const { isWorking, isShortBreak, isLongBreak, selectCycle } =
    useContext(ClockContext);

  return (
    <div className={styles.timerControlsWrapper}>
      <Button
        backgroundColor={
          isWorking ? 'var(--orange)' : 'var(--gray-quarternary)'
        }
        textColor="#e1e1e6"
        title="Pomodoro"
        width="30%"
        onClick={() => selectCycle('pomodoro')}
      />
      <Button
        backgroundColor={
          isShortBreak ? 'var(--orange)' : 'var(--gray-quarternary)'
        }
        textColor="#e1e1e6"
        title="Pausa Curta"
        width="30%"
        onClick={() => selectCycle('short-break')}
      />
      <Button
        backgroundColor={
          isLongBreak ? 'var(--orange)' : 'var(--gray-quarternary)'
        }
        textColor="#e1e1e6"
        title="Pausa Longa"
        width="30%"
        onClick={() => selectCycle('long-break')}
      />
    </div>
  );
}
