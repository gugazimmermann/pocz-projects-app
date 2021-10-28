import api from '../../api';
import token from '../../api/token';
import { ApiIdReq, ApiMessageRes } from '../../interfaces/api';
import {
  IPlace, PlacesActiveReq, PlacesFormDataReq, PlacesManagerRes, PlacesUsersRes,
} from '../../interfaces/places';
import { errorHandler } from '../../libs';

export async function getAll(): Promise<IPlace[] | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/places/${tenantId}`);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getOne({ id }: ApiIdReq): Promise<IPlace | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/places/${tenantId}/${id}`);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function create({ formData }: PlacesFormDataReq): Promise<IPlace | Error> {
  try {
    // eslint-disable-next-line no-param-reassign
    formData.tenantId = token.getLocalTenantId();
    const { data } = await api.post('/places', formData);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function update({ formData }: PlacesFormDataReq): Promise<IPlace | Error> {
  try {
    const { data } = await api.put('/places', formData);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteOne({ id }: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.delete(`/places/${id}`);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function count(): Promise<number | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.get(`/places/count/${tenantId}`);
    return data.places;
  } catch (err) {
    return errorHandler(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export async function active({ active, placeId }: PlacesActiveReq): Promise<IPlace | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/places/active/${tenantId}`, { active, placeId });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function managers(
  { placeId, managersList }: PlacesManagerRes,
): Promise<IPlace | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/places/managers/${tenantId}`, { placeId, managersList });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function users({ placeId, usersList }: PlacesUsersRes): Promise<IPlace | Error> {
  try {
    const tenantId = token.getLocalTenantId();
    const { data } = await api.post(`/places/users/${tenantId}`, { placeId, usersList });
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}
