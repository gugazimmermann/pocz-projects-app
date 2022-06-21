import { NavLink } from 'react-router-dom';
import { MenuSubItemInterface } from '@interfaces';

interface MenuItemProps {
  subitem: MenuSubItemInterface;
}
export function MenuLink({ subitem }: MenuItemProps) {
  const { name, link } = subitem;
  return (
    <NavLink
      to={link}
      activeClassName="bg-primary-200 text-primary-500"
      className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700"
    >
      <span className="pl-8">{name}</span>
    </NavLink>
  );
}

export default MenuLink;
