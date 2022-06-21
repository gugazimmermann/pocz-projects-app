import { Lang } from '@lang';
import { PERSONS_TYPE } from '@settings';

export function seePersonsType(type: PERSONS_TYPE): string {
  if (
    type.toLocaleLowerCase() === Lang.Persons.Types.Clients.toLocaleLowerCase()
  ) { return 'clients'; }
  if (
    type.toLocaleLowerCase() === Lang.Persons.Types.Supliers.toLocaleLowerCase()
  ) { return 'supliers'; }
  return 'contacts';
}
