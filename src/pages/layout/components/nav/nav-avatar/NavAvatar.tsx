import {
  useRef, useState, useEffect, ReactElement,
} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { IProfiles } from '@interfaces';
import { Lang } from '@lang';
import { getUserInitials } from '@libs';
import { AuthRoutes, AppRoutes } from '@routes';
import { AuthServices } from '@services';
import { LogoutIcon, ProfileIcon, SubscriptionIcon } from '@icons';

export interface NavAvatarProps {
  profile: IProfiles;
}

export function NavAvatar({ profile }: NavAvatarProps) {
  const history = useHistory();
  const divRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      if (open && divRef.current && !divRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open]);

  const handleLogout = () => {
    AuthServices.logout();
    history.push(AuthRoutes.SignIn);
  };

  function avatarButton(p: IProfiles) {
    if (!p.avatar) {
      return (
        <button
          data-testid="initialsId"
          type="button"
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full flex justify-center items-center text-center font-bold text-2xl text-primary-500 bg-primary-50 hover:text-primary-900 hover:bg-primary-100 focus:outline-none focus:bg-primary-100 focus:ring-primary-900"
        >
          {p.name
            ? getUserInitials(p.name)
            : (process.env.REACT_APP_PROJECT_NAME as string)[0]}
        </button>
      );
    }
    return (
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="transition-opacity duration-200 rounded-full"
        >
          <span className="sr-only">Profile Menu</span>
          <img
            data-testid="avatarImgId"
            className="w-10 h-10 rounded-full"
            src={`${process.env.REACT_APP_AVATAR_URL}/${p.avatar}`}
            alt={p.name}
          />
        </button>
      </div>
    );
  }

  function NavLink({
    name,
    route,
    Icon,
  }: {
    name: string;
    route: string;
    Icon: ReactElement;
  }) {
    return (
      <Link
        to={route}
        onClick={() => setOpen(false)}
        className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-100"
      >
        <div className="flex flex-row justify-start items-center">
          {Icon}
          <span className="ml-2">{name}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative z-10 pt-1">
      {avatarButton(profile)}
      <div
        ref={divRef}
        className={`absolute right-0 top-12 w-40 py-1 bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none ${
          !open ? 'hidden' : ''
        }`}
      >
        <NavLink
          route={AppRoutes.Profile}
          name={Lang.Layout.Nav.Profile}
          Icon={<ProfileIcon styles="w-4 h-4" stroke={2} />}
        />
        {profile.isAdmin && (
          <NavLink
            route={AppRoutes.Subscriptions}
            name={Lang.Layout.Nav.Subscription}
            Icon={<SubscriptionIcon styles="w-4 h-4" stroke={2} />}
          />
        )}
        <div className="flex flex-row justify-start items-center">
          <button
            type="button"
            onClick={() => handleLogout()}
            className="cursor-pointer text-left w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-100"
          >
            <div className="flex flex-row justify-start items-center">
              <LogoutIcon styles="w-4 h-4" stroke={2} />
              <span className="ml-2">{Lang.Layout.Nav.Logout}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavAvatar;
