import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IProfiles } from '@interfaces';
import { PLACES } from '@settings';
import { MenuContext } from '../../../../context';
import MenuItem from './menu-item/MenuItem';
import MenuTitle from './menu-title/MenuTitle';
import { menu } from './settings';

export interface MenuProps {
  profile: IProfiles;
  places: number;
  setMenuOpen(menuOpen: boolean): void;
  menuOpen: boolean;
}

export function Menu({
  profile, places, setMenuOpen, menuOpen,
}: MenuProps) {
  const { pathname } = useLocation();
  const { dispatch } = useContext(MenuContext);

  useEffect(() => {
    const activeMenu = pathname.split('/')[1];
    if (activeMenu) { dispatch({ type: 'UPDATE_MENU', payload: pathname.split('/')[1] }); }
  }, [pathname]);

  return (
    <aside
      className={`shrink w-64 bg-white ${
        !menuOpen ? 'hidden' : 'md:block'
      }`}
    >
      <div className="flex flex-col h-full">
        <MenuTitle setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

        <nav className="flex-1 px-2 pt-2 overflow-y-hidden hover:overflow-y-auto border-r">
          {menu.map((item, i) => {
            if (item.name === PLACES.PLURAL) {
              return <MenuItem key={i} item={item} />;
            }
            if (item.name !== PLACES.PLURAL && profile.zip && places) {
              return <MenuItem key={i} item={item} />;
            }
            return null;
          })}
        </nav>
        {/* TODO: User Settings */}
        {/* <MenuFooter /> */}
      </div>
    </aside>
  );
}

export default Menu;
