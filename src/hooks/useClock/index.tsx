import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { getNotificationContext } from '../useNotification';
import { ClockConfig, CLOCK_CONFIG, timeData } from './config';

type Cycles = 'pomodoro' | 'short-break' | 'long-break';

interface ClockContextData {
  currentTime: number;
  totalTime: number;
  currentCycle: number;
  totalCycles: number;
  isRunning: boolean;
  isWorking: boolean;
  isShortBreak: boolean;
  isLongBreak: boolean;
  isConfiguring: boolean;
  config: ClockConfig;
  startTimer: () => void;
  stopTimer: () => void;
  selectCycle: (cycle: Cycles) => void;
  changeIsConfiguring: (config?: ClockConfig) => void;
}

interface ClockProps {
  children: ReactNode;
}

export const ClockContext = createContext({} as ClockContextData);

let timer = 0;

export function ClockContextProvider(props: ClockProps) {
  // Defaults to 25 minutes
  const [config, setConfig] = useLocalStorage('@pomogo:config', CLOCK_CONFIG);
  const [currentTime, setCurrentTime] = useState(
    (config as ClockConfig).POMODORO_TIME
  );
  const [totalTime, setTotalTime] = useState(
    (config as ClockConfig).POMODORO_TIME
  );
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalCycles, setTotalCycle] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const { notification, notify, permission } = getNotificationContext();

  useEffect(() => {
    document.title = `PomoGO - ${timeData.getMinutes(currentTime)}`;
  }, [currentTime]);

  useEffect(() => {
    if (currentTime == 0 && isWorking) {
      currentCycle == CLOCK_CONFIG.CYCLES
        ? selectCycle('long-break')
        : selectCycle('short-break');

      if (permission == 'granted') {
        notification?.close();
        notify('Hora de descansar!');
      }
    }

    if (currentTime == 0 && isShortBreak) {
      selectCycle('pomodoro');
      setCurrentCycle(prevCycle => prevCycle + 1);

      if (permission == 'granted') {
        notification?.close();
        notify('Hora de trabalhar!', {
          body: `Ciclo ${currentCycle + 1} de ${totalCycles}!`
        });
      }
    }

    if (currentTime == 0 && isLongBreak) {
      selectCycle('pomodoro');
      setCurrentCycle(1);

      if (permission == 'granted') {
        notification?.close();
        notify('Hora de trabalhar!', {
          body: `Ciclo 1 de ${totalCycles}!`
        });
      }
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime((config as ClockConfig).POMODORO_TIME);
    setTotalTime((config as ClockConfig).POMODORO_TIME);
  }, [config]);

  const startTimer = () => {
    setIsRunning(true);

    timer = setInterval(() => {
      setCurrentTime(prevTime => {
        if (prevTime - 1000 === 0) {
          stopTimer();
          return 0;
        }

        return prevTime - 1000;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timer);
  };

  const resetTimer = (time: number) => {
    setCurrentTime(time);
  };

  const selectCycle = (cycle: 'pomodoro' | 'short-break' | 'long-break') => {
    if (cycle == 'pomodoro') {
      stopTimer();
      setTotalTime((config as ClockConfig).POMODORO_TIME);
      resetTimer((config as ClockConfig).POMODORO_TIME);
      setIsWorking(true);
      setIsShortBreak(false);
      setIsLongBreak(false);

      return;
    }

    if (cycle == 'short-break') {
      stopTimer();
      setTotalTime((config as ClockConfig).SHORT_BREAK_TIME);
      resetTimer((config as ClockConfig).SHORT_BREAK_TIME);
      setIsShortBreak(true);
      setIsWorking(false);
      setIsLongBreak(false);

      return;
    }

    if (cycle == 'long-break') {
      stopTimer();
      setTotalTime((config as ClockConfig).LONG_BREAK_TIME);
      resetTimer((config as ClockConfig).LONG_BREAK_TIME);
      setIsLongBreak(true);
      setIsWorking(false);
      setIsShortBreak(false);

      return;
    }
  };

  const changeIsConfiguring = (newConfig?: ClockConfig) => {
    if (newConfig) {
      if (
        newConfig.POMODORO_TIME === (config as ClockConfig).POMODORO_TIME &&
        newConfig.SHORT_BREAK_TIME ===
          (config as ClockConfig).SHORT_BREAK_TIME &&
        newConfig.LONG_BREAK_TIME === (config as ClockConfig).LONG_BREAK_TIME
      ) {
        setIsConfiguring(prevState => !prevState);
        return;
      }

      setConfig(newConfig);
    }

    stopTimer();
    setIsConfiguring(prevState => !prevState);
  };

  return (
    <ClockContext.Provider
      value={{
        currentTime,
        totalTime,
        currentCycle,
        totalCycles,
        isRunning,
        startTimer,
        stopTimer,
        isWorking,
        isShortBreak,
        isLongBreak,
        isConfiguring,
        changeIsConfiguring,
        selectCycle,
        config
      }}
    >
      {props.children}
    </ClockContext.Provider>
  );
}

export const useClock = () => {
  const context = useContext(ClockContext);

  return context;
};
