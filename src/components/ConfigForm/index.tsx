import styles from './styles.module.scss';
import { timeData } from '../../hooks/useClock/config';
import { useForm } from '../../hooks/form';
import { Select } from '../Select';

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
  const timeValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  return (
    <form action="#">
      <span>Tempo (minutos)</span>

      <div className={styles.formControlWrapper}>
        <label htmlFor={pomodoroInputName}>Pomodoro</label>
        <Select
          name={pomodoroInputName}
          id={pomodoroInputName}
          values={timeValues}
          defaultValue={5}
          value={newPomodoroTime}
          onChange={e => updateConfigValue('pomodoro', Number(e.target.value))}
        />
      </div>

      <div className={styles.formControlWrapper}>
        <label htmlFor={shortBreakInputName}>Pausa Curta</label>
        <Select
          name={shortBreakInputName}
          id={shortBreakInputName}
          values={timeValues}
          defaultValue={5}
          value={newShortBreakTime}
          onChange={e =>
            updateConfigValue('short-break', Number(e.target.value))
          }
        />
      </div>

      <div className={styles.formControlWrapper}>
        <label htmlFor={longBreakInputName}>Pausa Longa</label>
        <Select
          name={longBreakInputName}
          id={longBreakInputName}
          values={timeValues}
          defaultValue={5}
          value={newLongBreakTime}
          onChange={e =>
            updateConfigValue('long-break', Number(e.target.value))
          }
        />
      </div>
    </form>
  );
}
