import { CloseIcon, NotificationIcon } from '@icons';
import { Lang } from '@lang';

export interface NavNotificationProps {
  setNotificationOpen(notificationOpen: boolean): void;
  notificationOpen: boolean;
}

export function NavNotification({
  setNotificationOpen,
  notificationOpen,
}: NavNotificationProps) {
  return (
    <section
      data-testid="navNotificationSectionId"
      className={`fixed inset-y-0 right-0 z-20 w-full max-w-xs bg-white shadow-xl sm:max-w-md focus:outline-none ${
        notificationOpen ? '' : 'hidden'
      }`}
    >
      <div className="absolute left-10 top-3 -translate-x-full">
        <button
          data-testid="navNotificationId"
          type="button"
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="p-2 text-white rounded-md focus:outline-none focus:ring"
        >
          <CloseIcon styles="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex space-x-2 bg-primary-500 text-white items-center justify-center h-14 border-b">
          <NotificationIcon styles="w-5 h-5" />
          <h2 className="text-xl font-medium">
            {Lang.Layout.Notifications.Title}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default NavNotification;
