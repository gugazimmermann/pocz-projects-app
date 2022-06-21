import { api } from '@api';
import { ApiIdReq, ApiMessageRes, INotes } from '@interfaces';
import { errorHandler } from '@libs';

export interface NotesGetAllReq {
  ownerId: string;
}

export interface NotesFormDataReq {
  formData: INotes;
}

export async function getAll({
  ownerId,
}: NotesGetAllReq): Promise<INotes[] | Error> {
  try {
    const { data } = await api.get(`/notes/${ownerId}`);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function create({
  formData,
}: NotesFormDataReq): Promise<INotes | Error> {
  try {
    const { data } = await api.post('/notes', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function update({
  formData,
}: NotesFormDataReq): Promise<INotes | Error> {
  try {
    const { data } = await api.put('/notes', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteOne({
  id,
}: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/notes/${id}`);
  } catch (err) {
    return errorHandler(err);
  }
}
