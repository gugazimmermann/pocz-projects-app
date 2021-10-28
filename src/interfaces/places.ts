import { IMembersSimple } from './members';
import { IProfilesList } from './profiles';

export interface IPlace {
  id: string;
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
  active?: boolean;
  tenantId?: string;
  managersPlace?: IProfilesList[];
  employeesPlace?: IProfilesList[];
  clientsPlace?: IProfilesList[];
  supliersPlace?: IProfilesList[];
  contactsPlace?: IProfilesList[];
}

export interface PlacesActiveReq {
  active: boolean;
  placeId: string;
}

export interface PlacesManagerRes {
  placeId: string;
  managersList: IMembersSimple[];
}

export interface PlacesUsersRes {
  placeId: string;
  usersList: IMembersSimple[];
}

export interface PlacesFormDataReq {
  formData: IPlace;
}
