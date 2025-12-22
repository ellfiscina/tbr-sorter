'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
} from 'react';

import { NotificationType } from '@/lib/types';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (
    message: string,
    type?: NotificationType,
    duration?: number
  ) => void;
  clearNotification: () => void;
}

const NotificationContext =
  createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setNotification(null);
  }, []);

  const showNotification = useCallback(
    (
      message: string,
      type: NotificationType = 'info',
      duration: number = 3000
    ) => {

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const id = `notification-${Date.now()}-${Math.random()}`;

      const newNotification: Notification = {
        id,
        message,
        type,
        duration,
      };

      setNotification(newNotification);

      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          setNotification(null);
          timeoutRef.current = null;
        }, duration);
      }
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
