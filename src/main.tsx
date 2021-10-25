import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ClockContextProvider } from './hooks/useClock';

ReactDOM.render(
  <React.StrictMode>
    <ClockContextProvider>
      <App />
    </ClockContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
