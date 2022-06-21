import { ReactElement } from 'react';

export interface MenuSubItemInterface {
  name: string;
  link: string;
}

export interface MenuItemInterface {
  name: string;
  route: string;
  icon: ReactElement;
  subItems: MenuSubItemInterface[];
}
