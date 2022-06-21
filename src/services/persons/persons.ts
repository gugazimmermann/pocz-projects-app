import { api } from '@api';
import {
  ICompanies,
  ApiIdReq,
  IPersons,
  IOnwersList,
  ApiFormDataReq,
  ApiMessageRes,
} from '@interfaces';
import { errorHandler } from '@libs';

export interface BCFormDataCompaniesReq {
  formData: ICompanies;
}

export async function getAll(type: string): Promise<IPersons[] | Error> {
  try {
    const { data } = await api.get(`/persons/type/${type}`);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getOne({ id }: ApiIdReq): Promise<IPersons | Error> {
  try {
    const { data } = await api.get(`/persons/${id}`);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function changePersonOwner({
  id,
  owners,
}: {
  id: string;
  owners: IOnwersList[];
}): Promise<IPersons[] | Error> {
  try {
    const { data } = await api.put(`/persons/owners/${id}`, { owners });
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function createPerson({
  formData,
}: ApiFormDataReq): Promise<IPersons | Error> {
  try {
    const { data } = await api.post('/persons', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function updatePerson({
  formData,
}: ApiFormDataReq): Promise<IPersons | Error> {
  try {
    const { data } = await api.put('/persons', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteOnePerson({
  id,
}: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/persons/${id}`);
  } catch (err) {
    return errorHandler(err);
  }
}
