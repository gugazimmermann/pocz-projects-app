import { api } from '@api';
import {
  IPlaces,
  ApiIdReq,
  PlacesFormDataReq,
  ApiMessageRes,
  PlacesActiveReq,
  PlacesManagerRes,
  PlacesEmployeesListRes,
} from '@interfaces';
import { errorHandler } from '@libs';

/* eslint-disable @typescript-eslint/no-shadow */
export async function getAll(): Promise<IPlaces[] | Error> {
  try {
    const { data } = await api.get('/places');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function getOne({ id }: ApiIdReq): Promise<IPlaces | Error> {
  try {
    const { data } = await api.get(`/places/${id}`);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function create({
  formData,
}: PlacesFormDataReq): Promise<IPlaces | Error> {
  try {
    const { data } = await api.post('/places', formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function update({
  formData,
}: PlacesFormDataReq): Promise<IPlaces | Error> {
  try {
    const { data } = await api.put(`/places/${formData.id}`, formData);
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function deleteOne({
  id,
}: ApiIdReq): Promise<ApiMessageRes | Error> {
  try {
    const { data } = await api.delete(`/places/${id}`);
    return data;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function count(): Promise<number | Error> {
  try {
    const { data } = await api.get('/places/count');
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function active({
  active,
  placeId,
}: PlacesActiveReq): Promise<IPlaces | Error> {
  try {
    const { data } = await api.put(`/places/active/${placeId}`, {
      active,
    });
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function managers({
  placeId,
  managersList,
}: PlacesManagerRes): Promise<IPlaces | Error> {
  try {
    const { data } = await api.put(`/places/managers/${placeId}`, {
      managersList,
    });
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}

export async function employees({
  placeId,
  employeesList,
}: PlacesEmployeesListRes): Promise<IPlaces | Error> {
  try {
    const { data } = await api.put(`/places/employees/${placeId}`, {
      employeesList,
    });
    return data.body;
  } catch (err) {
    return errorHandler(err);
  }
}
