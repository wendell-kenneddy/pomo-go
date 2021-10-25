import { TimeData } from '../../utils/TimeData';
import { useLocalStorage } from '../useLocalStorage';

export interface ClockConfig {
  POMODORO_TIME: number;
  SHORT_BREAK_TIME: number;
  LONG_BREAK_TIME: number;
}

export const timeData = new TimeData();

export const CLOCK_CONFIG = {
  POMODORO_TIME: 25 * timeData.MINUTES_IN_MS,
  SHORT_BREAK_TIME: 5 * timeData.MINUTES_IN_MS,
  LONG_BREAK_TIME: 15 * timeData.MINUTES_IN_MS,
  CYCLES: 4
};

export const getSavedConfig = () => {
  const savedConfig = localStorage.getItem('@pomogo:config');
  let parsedConfig;

  if (savedConfig) parsedConfig = JSON.parse(savedConfig);
  return (parsedConfig as ClockConfig) || null;
};

export const saveConfig = (config: ClockConfig) => {
  localStorage.setItem('@pomogo:config', JSON.stringify(config));
};
