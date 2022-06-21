import { ReactElement } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';

export interface HeaderProps {
  before: string[];
  main: string;
  button?: (state: boolean) => ReactElement;
  back?: boolean;
  select?: () => ReactElement;
  search?: () => ReactElement;
  hide?: boolean;
}

export function Header({
  before,
  main,
  button,
  back,
  select,
  search,
  hide,
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center justify-between w-full px-4 py-2 lg:py-4 border-b">
      <Breadcrumb before={before} main={main} hide={hide} />
      {select && select()}
      {search && search()}
      {button && button(back as boolean)}
    </div>
  );
}

export default Header;
