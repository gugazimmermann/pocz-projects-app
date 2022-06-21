import { PERSONS_TYPE } from '@settings';

export type IPersonsTypes = PERSONS_TYPE.CLIENTS | PERSONS_TYPE.SUPLIERS | PERSONS_TYPE.CONTACTS;

export type IOnwersList = {
  id: string;
  name: string;
  type: 'person' | 'place';
}

export interface IPersons {
  id?: string;
  type?: IPersonsTypes;
  avatar?: string;
  name: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  position?: string;
  companyId?: string;
  company?: string;
  comments?: string;
  owner?: string;
  tenantId?: string;
  onwers?: IOnwersList[];
}
