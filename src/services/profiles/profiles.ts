import api from '../../api';
import { ApiFormDataReq, ApiMessageRes } from '../../interfaces/api';
import { IProfile } from '../../interfaces/profiles';
import { errorHandler } from '../../libs';

export async function getOne(): Promise<IProfile | Error> {
  try {
    const { data } = await api.get('/profile');
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function update({ formData }: ApiFormDataReq): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.put('/profile', formData);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}
