import { api } from '@api';
import { IAttachments, ApiMessageRes, ApiIdReq } from '@interfaces';
import { errorHandler } from '@libs';

export interface AttachmentsGetAllReq {
  ownerId: string;
}

export interface AttachmentsCreateReq {
  formData: FormData;
  onUploadProgress: any;
}

export async function getAll({
  ownerId,
}: AttachmentsGetAllReq): Promise<IAttachments[] | Error> {
  try {
    const { data } = await api.get(
      `/attachments/${ownerId}`,
    );
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function create({
  formData,
  onUploadProgress,
}: AttachmentsCreateReq): Promise<ApiMessageRes | Error> {
  try {
    return api.post('/attachments/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteOne({
  id,
}: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    return await api.delete(`/attachments/${id}`);
  } catch (err) {
    return errorHandler(err);
  }
}
