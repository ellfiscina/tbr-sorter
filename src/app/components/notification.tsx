'use client';

import { CheckCircle2, AlertCircle, Info, X, CircleX } from 'lucide-react';

import { useNotification } from '@/contexts/notification-context';
import { NotificationType } from '@/lib/types';

const Notification = () => {
  const { notification, clearNotification } = useNotification()

  if (!notification) return null

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

  const colors = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info'
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      <div className="pointer-events-auto">
        <div
          className={`${colors[notification.type]} text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-md animate-slide-down`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex-shrink-0">
            {getIcon(notification.type)}
          </div>
          <p className="flex-1 text-sm">{notification.message}</p>
          <button
            onClick={() => clearNotification()}
            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

  );
}

export default Notification;