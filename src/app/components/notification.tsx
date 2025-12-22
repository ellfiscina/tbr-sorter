'use client';

import { CheckCircle2, AlertCircle, Info, X, CircleX } from 'lucide-react';

import { useNotification } from '@/contexts/notification-context';
import { NotificationType } from '@/lib/types';

const Notification = () => {
  const { notifications, removeNotification } = useNotification()

  const getIcon = (type: NotificationType) => {
    const className = "w-5 h-5 text-white";

    switch (type) {
      case 'success':
        return <CheckCircle2 className={className} />
      case 'error':
        return <CircleX className={className} />
      case 'warning':
        return <AlertCircle className={className} />
      case 'info':
      default:
        return <Info className={className} />
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`
            bg-${notification.type}
            rounded-button shadow-strong
            p-4 pr-10
            border-2
            animate-slide-in
            relative
          `}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl font-bold">{getIcon(notification.type)}</span>
            <p className="flex-1 font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notification;