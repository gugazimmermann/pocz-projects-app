import { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IProfile } from '../../../../../interfaces/profiles';
import { getUserInitials } from '../../../../../libs';
import { AppRoutes, AuthRoutes } from '../../../../../routes';
import { AuthServices } from '../../../../../services';

export interface NavAvatarProps {
  profile: IProfile;
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

  function avatarButton(p: IProfile) {
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
          <span className="sr-only">Perfil Menu</span>
          <img
            data-testid="avatarImgId"
            className="w-10 h-10 rounded-full"
            src={`${process.env.REACT_APP_AVATAR_URL}${p.avatar}`}
            alt={p.name}
          />
        </button>
      </div>
    );
  }

  function NavLink({ name, route }: { name: string; route: string }) {
    return (
      <Link
        to={route}
        onClick={() => setOpen(false)}
        className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-100"
      >
        {name}
      </Link>
    );
  }

  return (
    <div className="relative z-10 pt-1">
      {avatarButton(profile)}
      <div
        ref={divRef}
        className={`absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 focus:outline-none ${
          !open ? 'hidden' : ''
        }`}
      >
        <NavLink route={AppRoutes.profiles} name="Seu Perfil" />
        {profile.isAdmin && (
          <NavLink route={AppRoutes.subscriptions} name="Assinatura" />
        )}
        <button
          type="button"
          onClick={() => handleLogout()}
          className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-100"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default NavAvatar;
