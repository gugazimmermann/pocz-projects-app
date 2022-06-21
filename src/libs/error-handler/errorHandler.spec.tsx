/* eslint-disable jest/no-conditional-expect */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../api';
import { AuthServices } from '../../services';
import { errorHandler } from './errorHandler';

describe('Error Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return "Ocorreu um error ao acessar o servidor"', () => {
    try {
      errorHandler('test');
    } catch (err) {
      expect((err as any).message).toBe('Ocorreu um error ao acessar o servidor');
    }
  });

  it('must be a AxiosError', async () => {
    const mock = new MockAdapter(api);
    try {
      mock.onGet('/auth/me').networkErrorOnce();
      const mockedError = await AuthServices.getMe();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
      errorHandler(mockedError);
    } catch (err) {
      expect((err as any).message).toBe('Error: Network Error');
    }
  });
});
