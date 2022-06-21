import { api, TokenService } from '@api';
import {
  IMembersSimple, ApiIdReq, ApiMessageRes, IMembers,
} from '@interfaces';
import { errorHandler } from '@libs';

export interface MembersCreateReq {
  tenantId: string;
  code: string;
  password: string;
}

export interface MembersInviteCodeReq {
  tenantId: string;
  code: string;
}

export interface MembersCreateInviteReq {
  formData: {
    name: string;
    email: string;
    tenantId?: string;
  };
}

export async function getAll(): Promise<IMembersSimple[] | Error> {
  try {
    const { data } = await api.get('/members');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getOne({
  id,
}: ApiIdReq): Promise<IMembersSimple | Error> {
  try {
    const { data } = await api.get(`/members/${id}`);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function create({
  code,
  password,
}: MembersCreateReq): Promise<ApiMessageRes | Error> {
  try {
    const clearCode = +(code as string).toString().trim().replace(/ /g, '');
    const { data } = await api.post('/members', {
      code: clearCode,
      password,
    });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getInvites(): Promise<IMembers[] | Error> {
  try {
    const { data } = await api.get('/members/invites');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getInviteCode({
  code,
}: MembersInviteCodeReq): Promise<IMembers | Error> {
  try {
    const { data } = await api.get(`/members/invites/code/${code}`);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function createInvite({
  formData,
}: MembersCreateInviteReq): Promise<IMembers | Error> {
  try {
    const tenantId = TokenService.getLocalTenantId();
    // eslint-disable-next-line no-param-reassign
    formData.tenantId = tenantId;
    const { data } = await api.post('/members/invites', formData);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function sendInvite({ id }: ApiIdReq): Promise<IMembers | Error> {
  try {
    const { data } = await api.get(`/members/invites/${id}`);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteInvite({
  id,
}: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/members/invites/${id}`);
  } catch (err) {
    return errorHandler(err);
  }
}
