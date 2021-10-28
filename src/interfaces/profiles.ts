export interface IProfile {
  id?: string;
  isAdmin: boolean;
  isProfessional: boolean;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  subscription?: {
    planId: string;
    type: string;
    reason: string;
    frequency: number;
    createdAt: string;
  };
}

export interface IProfilesList {
  id: string;
  name: string;
  avatar: string;
}
