/* eslint-disable jest/no-conditional-expect */
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import api from '../../api';
import { IProfile } from '../../interfaces/profiles';
import * as ProfilesServices from './profiles';

faker.locale = 'pt_BR';

const getOneRes = {
  id: faker.datatype.uuid(),
  isAdmin: faker.datatype.boolean(),
  isProfessional: faker.datatype.boolean(),
  avatar: faker.internet.avatar(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  zip: faker.address.zipCode(),
  address: faker.address.streetName(),
  number: faker.datatype.number().toString(),
  complement: undefined,
  neighborhood: faker.address.county(),
  city: faker.address.cityName(),
  state: faker.address.state(),
  subscription: {
    planId: faker.datatype.uuid(),
    type: faker.datatype.string(),
    reason: faker.datatype.string(),
    frequency: faker.datatype.number(),
    createdAt: faker.datatype.string(),
  },
};

describe('Profiles Services', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
    jest.restoreAllMocks();
  });

  it('getOne must return getOneRes', async () => {
    try {
      mock.onGet('/profile').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getOneRes]), 200);
        }),
      );
      const data = await ProfilesServices.getOne();
      expect((data as IProfile).id).toBe(getOneRes.id);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getOne must return axios error', async () => {
    try {
      mock.onGet('/profile').networkErrorOnce();
      const mockedError = await ProfilesServices.getOne();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('update must return Updated message', async () => {
    const formData = new FormData();
    try {
      mock.onPut('/profile').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, { message: 'updated' }]), 200);
        }),
      );
      const data = await ProfilesServices.update({
        formData,
      });
      expect(data.message).toBe('updated');
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('update must return axios error', async () => {
    const formData = new FormData();
    try {
      mock.onPut('/profile').networkErrorOnce();
      const mockedError = await ProfilesServices.update({
        formData,
      });
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });
});
