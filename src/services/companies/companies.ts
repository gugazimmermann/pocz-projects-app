import { api } from '@api';
import {
  ICompanies,
  ApiIdReq,
  ApiFormDataReq,
  ApiMessageRes,
} from '@interfaces';
import { errorHandler } from '@libs';

export interface BCFormDataCompaniesReq {
  formData: ICompanies;
}

export async function getAll(): Promise<ICompanies[] | Error> {
  try {
    const { data } = await api.get('/companies');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getOne({ id }: ApiIdReq): Promise<ICompanies | Error> {
  try {
    const { data } = await api.get(`/companies/${id}`);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function create({
  formData,
}: ApiFormDataReq): Promise<ICompanies | Error> {
  try {
    const { data } = await api.post('/companies', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function update({
  formData,
}: ApiFormDataReq): Promise<ICompanies | Error> {
  try {
    const { data } = await api.put('/companies', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteOne({
  id,
}: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/companies/${id}`);
  } catch (err) {
    return errorHandler(err);
  }
}
