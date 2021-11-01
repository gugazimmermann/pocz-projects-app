import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IProfile } from '../../../../interfaces/profiles';
import { MenuContext } from '../../context';
import MenuFooter from './menu-footer/MenuFooter';
import MenuItem from './menu-item/MenuItem';
import MenuTitle from './menu-title/MenuTitle';

export interface MenuSubItemInterface {
  name: string;
  link: string;
}

export interface MenuItemInterface {
  name: string;
  route: string;
  icon: string;
  subItems: MenuSubItemInterface[];
}

interface MenuProps {
  profile: IProfile;
  places: number;
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

const menu: MenuItemInterface[] = [
  {
    name: 'Relatórios',
    route: 'relatorios',
    icon: 'DashboardIcon',
    subItems: [
      {
        name: 'Escritórios',
        link: '/relatorios/escritorios',
      },
      {
        name: 'Processos',
        link: '/relatorios/processos',
      },
    ],
  },
  {
    name: 'Escritórios',
    route: 'relatorios',
    icon: 'PlacesIcon',
    subItems: [
      {
        name: 'Escritórios',
        link: '/escritorios/escritorios',
      },
    ],
  },
];

export function Menu({
  profile, places, setMenuOpen, menuOpen,
}: MenuProps) {
  const { pathname } = useLocation();
  const { dispatch } = useContext(MenuContext);

  useEffect(() => {
    const activeMenu = pathname.split('/')[1];
    if (activeMenu) dispatch({ type: 'UPDATE_MENU', payload: pathname.split('/')[1] });
  }, []);

  return (
    <aside
      className={`flex-shrink-0 w-64 bg-white ${
        !menuOpen ? 'hidden' : 'md:block'
      }`}
    >
      <div className="flex flex-col h-full">
        <MenuTitle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <nav className="flex-1 px-2 pt-2 overflow-y-hidden hover:overflow-y-auto border-r">
          {menu.map((item, i) => {
            if (item.name === 'Escritórios') {
              return <MenuItem key={i} item={item} />;
            }
            if (item.name !== 'Escritórios' && profile.zip && places) {
              return <MenuItem key={i} item={item} />;
            }
            return null;
          })}
        </nav>

        <MenuFooter />
      </div>
    </aside>
  );
}

export default Menu;
