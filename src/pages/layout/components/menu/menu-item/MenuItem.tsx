import { useContext, useState, useEffect } from 'react';
import { MenuArrowIcon } from '@icons';
import { MenuItemInterface } from '@interfaces';
import { MenuContext } from '../../../../../context';
import MenuLink from '../menu-link/MenuLink';

interface MenuItemProps {
  item: MenuItemInterface;
}

export function MenuItem({ item }: MenuItemProps) {
  const {
    name, icon, route, subItems,
  } = item;
  const { state } = useContext(MenuContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(route.split('/')[1] === state.activeMenu);
  }, [route, state]);

  return (
    <>
      <button
        data-testid="menuItemId"
        type="button"
        onClick={() => setActive(!active)}
        className={`w-full flex items-center p-2 transition-colors rounded-md cursor-pointer ${
          active
            ? 'text-white bg-primary-500'
            : 'text-gray-900 hover:bg-primary-100'
        }`}
      >
        {icon}
        <span className="ml-2 text-sm">{name}</span>
        <span className="ml-auto">
          <MenuArrowIcon
            styles="w-4 h-4"
            active={active}
          />
        </span>
      </button>
      <div className={`${!active && 'hidden'}`}>
        {subItems.map((subitem, i) => (
          <MenuLink key={i} subitem={subitem} />
        ))}
      </div>
    </>
  );
}

export default MenuItem;
