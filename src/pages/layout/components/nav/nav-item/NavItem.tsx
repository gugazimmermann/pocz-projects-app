import { SearchIcon, SettingsIcon, NotificationIcon } from '@icons';
import { NAVICONS } from '../constants';

export interface NavItemProps {
  item: string;
  icon: NAVICONS;
  alert: boolean;
  open?(openState: boolean): void;
  openState?: boolean;
}

export function NavItem({
  item, icon, alert, open, openState,
}: NavItemProps) {
  function getIcon(i: string) {
    const IconStyle = 'w-7 h-7';

    switch (i) {
      case NAVICONS.SEARCH: {
        return <SearchIcon styles={IconStyle} />;
      }
      case NAVICONS.SETTINGS: {
        return <SettingsIcon styles={IconStyle} />;
      }
      default: {
        return <NotificationIcon styles={IconStyle} />;
      }
    }
  }

  return (
    <button
      data-testid="navitem-id"
      type="button"
      onClick={() => (open ? open(!openState) : null)}
      className="p-2 relative transition-colors duration-200 rounded-full text-primary-500 bg-primary-50 hover:text-primary-900 hover:bg-primary-100 focus:outline-none focus:bg-primary-100 focus:ring-primary-900"
    >
      <span className="sr-only">{`Open ${item}`}</span>
      {getIcon(icon)}
      {alert && (
        <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-secondary-500 border-2 border-white rounded-full" />
      )}
    </button>
  );
}

export default NavItem;
