export interface IMembersSimple {
  id: string;
  avatar?: string;
  name: string;
  phone?: string;
  email?: string;
  role?: string;
  active?: boolean;
}

export interface IMembers {
  id?: string;
  name: string;
  email: string;
  code?: string;
  tenantId?: string;
  updatedAt?: Date;
}
