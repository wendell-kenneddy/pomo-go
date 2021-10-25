import { createContext, ReactNode, useContext, useState } from 'react';
import { useClock } from './useClock';
import { ClockConfig, timeData } from './useClock/config';

type FormValueUpdater = (
  target: 'pomodoro' | 'short-break' | 'long-break',
  value: number
) => void;

interface FormData {
  newPomodoroTime: number;
  newShortBreakTime: number;
  newLongBreakTime: number;
  getNewConfig: () => ClockConfig;
  updateConfigValue: FormValueUpdater;
}

interface FormProps {
  children: ReactNode;
}

const FormContext = createContext({} as FormData);

export function FormProvider({ children }: FormProps) {
  const { config } = useClock();
  const [newPomodoroTime, setNewPomodoroTime] = useState(
    config.POMODORO_TIME / timeData.MINUTES_IN_MS
  );
  const [newShortBreakTime, setNewShortBreakTime] = useState(
    config.SHORT_BREAK_TIME / timeData.MINUTES_IN_MS
  );
  const [newLongBreakTime, setNewLongBreakTime] = useState(
    config.LONG_BREAK_TIME / timeData.MINUTES_IN_MS
  );

  const getNewConfig = () => {
    let POMODORO_TIME = newPomodoroTime * timeData.MINUTES_IN_MS;
    let SHORT_BREAK_TIME = newShortBreakTime * timeData.MINUTES_IN_MS;
    let LONG_BREAK_TIME = newLongBreakTime * timeData.MINUTES_IN_MS;

    return {
      POMODORO_TIME,
      SHORT_BREAK_TIME,
      LONG_BREAK_TIME
    };
  };

  const updateConfigValue: FormValueUpdater = (target, value) => {
    if (target == 'pomodoro') {
      setNewPomodoroTime(value);
      return;
    }

    if (target == 'short-break') {
      setNewShortBreakTime(value);
      return;
    }

    if (target == 'long-break') {
      setNewLongBreakTime(value);
      return;
    }
  };

  return (
    <FormContext.Provider
      value={{
        newPomodoroTime,
        newShortBreakTime,
        newLongBreakTime,
        getNewConfig,
        updateConfigValue
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);

  return context;
}
