/* eslint-disable jest/no-conditional-expect */
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import api from '../../api';
import TokenService from '../../api/token';
import * as AuthServices from './auth';
import {
  ForgotPasswordCodeRes,
  ForgotPasswordRes,
  SignInRes,
  UserRes,
} from '../../interfaces/auth';

const signUpObj = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  planId: faker.datatype.uuid(),
  cardInfo: {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    expirationMonth: 1,
    expirationYear: 28,
    firstSixDigits: '123456',
    lastFourDigits: '1234',
  },
};

const signInObj = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const signInResObj = {
  auth: true,
  status: 'SUCCESS',
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  tenant: faker.datatype.uuid(),
};

const forgotPasswordObj = {
  email: faker.internet.email(),
};

const forgotPasswordResObj = {
  email: forgotPasswordObj.email,
  date: '01/01/2021 18:00:00',
};

const forgotPasswordCodeObj = {
  codeurl: faker.datatype.string(),
};

const forgotPasswordCodeResObj = {
  code: faker.datatype.string(),
};

const changePasswordObj = {
  codeNumber: faker.datatype.string(),
  password: faker.internet.password(),
};

const getMeResObj = {
  email: faker.internet.email(),
  createdAt: '01/01/2021 18:00:00',
  updatedAt: '01/01/2021 18:00:00',
};

describe('Auth Service', () => {
  let mock: MockAdapter;
  let tokenServiceSetUserMock: jest.SpyInstance;
  let tokenServiceRemoveUserMock: jest.SpyInstance;
  let tokenServiceGetLocalAccessTokenMock: jest.SpyInstance;

  beforeEach(() => {
    mock = new MockAdapter(api);
    tokenServiceSetUserMock = jest.spyOn(TokenService, 'setUser');
    tokenServiceRemoveUserMock = jest.spyOn(TokenService, 'removeUser');
    tokenServiceGetLocalAccessTokenMock = jest.spyOn(
      TokenService,
      'getLocalAccessToken',
    );
  });

  afterEach(() => {
    mock.reset();
    jest.restoreAllMocks();
  });

  it('signup must return "Usuário cadastrado com sucesso!"', async () => {
    try {
      mock.onPost('/auth/register').reply(
        () => new Promise((resolve) => {
          setTimeout(
            () => resolve([200, { message: 'Usuário cadastrado com sucesso!' }]),
            200,
          );
        }),
      );
      const { message } = await AuthServices.signup(signUpObj);
      expect(message).toBe('Usuário cadastrado com sucesso!');
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('signup must return axios error', async () => {
    try {
      mock.onPost('/auth/register').networkErrorOnce();
      const mockedError = await AuthServices.signup(signUpObj);
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('signin must return signInResObj and call tokenServiceMock', async () => {
    try {
      mock.onPost('/auth/login').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, signInResObj]), 200);
        }),
      );
      const data = await AuthServices.signin(signInObj);
      expect((data as SignInRes).auth).toBe(signInResObj.auth);
      expect((data as SignInRes).status).toBe(signInResObj.status);
      expect((data as SignInRes).accessToken).toBe(signInResObj.accessToken);
      expect((data as SignInRes).refreshToken).toBe(signInResObj.refreshToken);
      expect((data as SignInRes).tenant).toBe(signInResObj.tenant);
      expect(tokenServiceSetUserMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });
  it('signin must return axios error', async () => {
    try {
      mock.onPost('/auth/login').networkErrorOnce();
      const mockedError = await AuthServices.signin(signInObj);
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('forgotpassword must return forgotPasswordResObj', async () => {
    try {
      mock.onPost('/auth/forgot-password').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, forgotPasswordResObj]), 200);
        }),
      );
      const data = await AuthServices.forgotpassword(forgotPasswordObj);
      expect((data as ForgotPasswordRes).email).toBe(
        forgotPasswordResObj.email,
      );
      expect((data as ForgotPasswordRes).date).toBe(forgotPasswordResObj.date);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('forgotpassword must return axios error', async () => {
    try {
      mock.onPost('/auth/forgot-password').networkErrorOnce();
      const mockedError = await AuthServices.forgotpassword(signInObj);
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getforgotpasswordcode must return forgotPasswordCodeResObj', async () => {
    try {
      mock.onPost('/auth/forgot-password-code').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, forgotPasswordCodeResObj]), 200);
        }),
      );
      const data = await AuthServices.getforgotpasswordcode(
        forgotPasswordCodeObj,
      );
      expect((data as ForgotPasswordCodeRes).code).toBe(
        forgotPasswordCodeResObj.code,
      );
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getforgotpasswordcode must return axios error', async () => {
    try {
      mock.onPost('/auth/forgot-password-code').networkErrorOnce();
      const mockedError = await AuthServices.getforgotpasswordcode(
        forgotPasswordCodeObj,
      );
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('changepassword must return forgotPasswordCodeResObj', async () => {
    try {
      mock.onPost('/auth/change-password').reply(
        () => new Promise((resolve) => {
          setTimeout(
            () => resolve([200, { message: 'Password changed successfully!' }]),
            200,
          );
        }),
      );
      const data = await AuthServices.changepassword(changePasswordObj);
      expect(data.message).toBe('Password changed successfully!');
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('changepassword must return axios error', async () => {
    try {
      mock.onPost('/auth/change-password').networkErrorOnce();
      const mockedError = await AuthServices.changepassword(changePasswordObj);
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getMe must return getMeResObj', async () => {
    try {
      mock.onGet('/auth/me').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getMeResObj]), 200);
        }),
      );
      const data = await AuthServices.getMe();
      expect((data as UserRes).email).toBe(getMeResObj.email);
      expect((data as UserRes).createdAt).toBe(getMeResObj.createdAt);
      expect((data as UserRes).updatedAt).toBe(getMeResObj.updatedAt);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getMe must return axios error', async () => {
    try {
      mock.onGet('/auth/me').networkErrorOnce();
      const mockedError = await AuthServices.getMe();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('logout must call tokenServiceRemoveUserMock', () => {
    AuthServices.logout();
    expect(tokenServiceRemoveUserMock).toHaveBeenCalledTimes(1);
  });

  it('logout must call tokenServiceGetLocalAccessTokenMock', () => {
    AuthServices.getUser();
    expect(tokenServiceGetLocalAccessTokenMock).toHaveBeenCalledTimes(1);
  });
});
