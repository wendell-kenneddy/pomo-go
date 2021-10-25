import './theme/reset.css';
import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { TimerControls } from './components/TimerControls';
import { ConfigModal } from './components/ConfigModal';
import { useClock } from './hooks/useClock';
import { FormProvider } from './hooks/form';
import { Form } from './components/ConfigForm';

export function App() {
  const { isConfiguring } = useClock();

  return (
    <>
      {!!isConfiguring ? (
        <FormProvider>
          <ConfigModal>
            <Form />
          </ConfigModal>
        </FormProvider>
      ) : (
        <>
          <Header />
          <Timer />
          <TimerControls />
        </>
      )}
    </>
  );
}
