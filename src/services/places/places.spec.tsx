/* eslint-disable jest/no-conditional-expect */
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import api from '../../api';
import * as PlacesServices from './places';
import token from '../../api/token';
import { IPlace } from '../../interfaces/places';

faker.locale = 'pt_BR';

const getOneRes = {
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  zip: faker.address.zipCode(),
  address: faker.address.streetName(),
  number: faker.datatype.number().toString(),
  complement: undefined,
  neighborhood: faker.address.county(),
  city: faker.address.city(),
  state: faker.address.state(),
  active: faker.datatype.boolean(),
  tenantId: faker.datatype.uuid(),
  managersPlace: [],
  employeesPlace: [],
  clientsPlace: [],
  supliersPlace: [],
  contactsPlace: [],
};

describe('Places Services', () => {
  let mock: MockAdapter;
  let tokenMock: jest.SpyInstance;

  beforeEach(() => {
    mock = new MockAdapter(api);
    tokenMock = jest
      .spyOn(token, 'getLocalTenantId')
      .mockImplementation(() => '12345');
  });

  afterEach(() => {
    mock.reset();
    jest.restoreAllMocks();
  });

  it('getAll must return empty array', async () => {
    try {
      mock.onGet(/\/places\/\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, []]), 200);
        }),
      );
      const data = await PlacesServices.getAll();
      expect(data).toHaveLength(0);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getAll must return axios error', async () => {
    try {
      mock.onGet(/\/places\/\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.getAll();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getOne must return getOneRes', async () => {
    try {
      mock.onGet(/\/places\/\d+\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await PlacesServices.getOne({
        id: 'f51ac35f-d7ef-4430-8404-5901729e85fc',
      });
      expect((data as IPlace).id).toBe(getOneRes.id);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getOne must return axios error', async () => {
    try {
      mock.onGet(/\/places\/\d+\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.getOne({
        id: 'f51ac35f-d7ef-4430-8404-5901729e85fc',
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('create must return getOneRes', async () => {
    try {
      mock.onPost('/places').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await PlacesServices.create({
        formData: getOneRes,
      });
      expect((data as IPlace).id).toBe(getOneRes.id);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('create must return axios error', async () => {
    try {
      mock.onPost('/places').networkErrorOnce();
      const mockedError = await PlacesServices.create({
        formData: getOneRes,
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('update must return getOneRes', async () => {
    try {
      mock.onPut('/places').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await PlacesServices.update({
        formData: getOneRes,
      });
      expect((data as IPlace).id).toBe(getOneRes.id);
      expect(tokenMock).toHaveBeenCalledTimes(0);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('update must return axios error', async () => {
    try {
      mock.onPut('/places').networkErrorOnce();
      const mockedError = await PlacesServices.update({
        formData: getOneRes,
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('deleteOne must return deleted message', async () => {
    try {
      mock.onDelete(/\/places\/\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, { message: 'deleted' }]), 200);
        }),
      );
      const data = await PlacesServices.deleteOne({
        id: '12345',
      });
      expect(data.message).toBe('deleted');
      expect(tokenMock).toHaveBeenCalledTimes(0);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('deleteOne must return axios error', async () => {
    try {
      mock.onDelete(/\/places\/\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.deleteOne({
        id: '12345',
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('count must return 1', async () => {
    try {
      mock.onGet(/\/places\/count\/\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, { places: 1 }]), 200);
        }),
      );
      const data = await PlacesServices.count();
      expect(data).toBe(1);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('count must return axios error', async () => {
    try {
      mock.onGet(/\/places\/count\/\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.count();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('active must return getOneRes', async () => {
    try {
      mock.onPost(/\/places\/active\/\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await PlacesServices.active({
        active: false,
        placeId: faker.datatype.uuid(),
      });
      expect((data as IPlace).id).toBe(getOneRes.id);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('active must return axios error', async () => {
    try {
      mock.onPost(/\/places\/active\/\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.active({
        active: false,
        placeId: faker.datatype.uuid(),
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('managers must return getOneRes', async () => {
    try {
      mock.onPost(/\/places\/managers\/\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await PlacesServices.managers({
        managersList: [],
        placeId: faker.datatype.uuid(),
      });
      expect((data as IPlace).id).toBe(getOneRes.id);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('managers must return axios error', async () => {
    try {
      mock.onPost(/\/places\/managers\/\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.managers({
        managersList: [],
        placeId: faker.datatype.uuid(),
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('users must return getOneRes', async () => {
    try {
      mock.onPost(/\/places\/users\/\d+/).reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await PlacesServices.users({
        usersList: [],
        placeId: faker.datatype.uuid(),
      });
      expect((data as IPlace).id).toBe(getOneRes.id);
      expect(tokenMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('users must return axios error', async () => {
    try {
      mock.onPost(/\/places\/users\/\d+/).networkErrorOnce();
      const mockedError = await PlacesServices.users({
        usersList: [],
        placeId: faker.datatype.uuid(),
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });
});
