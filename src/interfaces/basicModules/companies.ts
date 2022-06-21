export interface ICompanies {
  id?: string;
  name: string;
  site?: string;
  email?: string;
  phone?: string;
  zip?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  comments?: string;
  contacts?: {
    id: string;
    name: string;
    position: string;
  }[];
  tenantId?: string;
}
