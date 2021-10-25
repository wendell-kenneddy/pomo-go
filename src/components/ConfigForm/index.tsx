import styles from './styles.module.scss';
import { timeData } from '../../hooks/useClock/config';
import { useForm } from '../../hooks/form';

export function Form() {
  const {
    newPomodoroTime,
    newLongBreakTime,
    newShortBreakTime,
    updateConfigValue
  } = useForm();
  const pomodoroInputName = 'pomodoro-time';
  const shortBreakInputName = 'short-break-time';
  const longBreakInputName = 'long-break-time';

  return (
    <form action="#">
      <span>Tempo (minutos)</span>

      <div className={styles.formControlWrapper}>
        <label htmlFor={pomodoroInputName}>Pomodoro</label>
        <input
          type="number"
          name={pomodoroInputName}
          id={pomodoroInputName}
          step="5"
          min="5"
          max="60"
          onChange={e => updateConfigValue('pomodoro', Number(e.target.value))}
          value={newPomodoroTime}
          required
        />
      </div>

      <div className={styles.formControlWrapper}>
        <label htmlFor={shortBreakInputName}>Pausa Curta</label>
        <input
          type="number"
          name={shortBreakInputName}
          id={shortBreakInputName}
          step="5"
          min="5"
          max="60"
          onChange={e =>
            updateConfigValue('short-break', Number(e.target.value))
          }
          value={newShortBreakTime}
          required
        />
      </div>

      <div className={styles.formControlWrapper}>
        <label htmlFor={longBreakInputName}>Pausa Longa</label>
        <input
          type="number"
          name={longBreakInputName}
          id={longBreakInputName}
          step="5"
          min="5"
          max="60"
          onChange={e =>
            updateConfigValue('long-break', Number(e.target.value))
          }
          value={newLongBreakTime}
          required
        />
      </div>
    </form>
  );
}
