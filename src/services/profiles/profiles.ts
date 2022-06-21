import { api } from '@api';
import { IProfiles, ApiFormDataReq, ApiMessageRes } from '@interfaces';
import { errorHandler } from '@libs';

export async function getOne(): Promise<IProfiles | Error> {
  try {
    const { data } = await api.get('/profile');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function update({
  formData,
}: ApiFormDataReq): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.put('/profile', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}
