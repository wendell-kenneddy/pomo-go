import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ClockContextProvider } from './hooks/useClock';
import { NotificationProvider } from './hooks/useNotification';

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <ClockContextProvider>
        <App />
      </ClockContextProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
