import { Link } from 'react-router-dom';
import { AppRoutes } from '@routes';
import { ArrowLeftIcon } from '@icons';

export interface MenuTitleProps {
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function MenuTitle({ setMenuOpen, menuOpen }: MenuTitleProps) {
  return (
    <div className="border-b h-14 flex items-center">
      <Link
        to={AppRoutes.Dashboards}
        className="text-3xl ml-6 text-center font-bold tracking-wider text-primary-600 flex-grow"
      >
        <div className="flex flex-row justify-center items-center">
          <img src="/logo32.png" alt="logo" />
          <span className="pl-4">{process.env.REACT_APP_PROJECT_NAME}</span>
        </div>
      </Link>
      <button
        data-testid="menutitleId"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-min pb-4 pt-4 pl-4"
      >
        <ArrowLeftIcon styles="w-6 h-6" />
      </button>
    </div>
  );
}

export default MenuTitle;
