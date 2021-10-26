import { useState, createContext, useContext, useEffect } from 'react';
import logoImg from '../../assets/icon-72x72.png';

type NotificationPermission = 'granted' | 'denied' | 'default';

interface NotificationContextData {
  notification: Notification | null;
  permission: NotificationPermission;
  notify: (title: string, config?: NotificationOptions) => void;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationContext = createContext({} as NotificationContextData);

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [permission, setPermission] =
    useState<NotificationPermission>('default');
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    if ('Notification' in window) {
      const userPermission = await Notification.requestPermission();
      setPermission(userPermission);
      return;
    }

    console.warn('Notifications not supported.');
  };

  const notify = (title: string, config?: NotificationOptions) => {
    const defaultConfig: NotificationOptions = {
      icon: logoImg,
      dir: 'ltr',
      lang: 'pt-br'
    };

    setNotification(
      new Notification(
        title,
        config ? { ...defaultConfig, ...config } : defaultConfig
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        permission,
        notification,
        notify
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function getNotificationContext() {
  const context = useContext(NotificationContext);

  return context;
}
