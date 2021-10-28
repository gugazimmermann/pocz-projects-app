/* eslint-disable jest/no-conditional-expect */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import { AuthServices } from '../../services';
import { errorHandler } from './errorHandler';

describe('Error Handler', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  it('return "Ocorreu um error ao acessar o servidor"', () => {
    try {
      errorHandler('test');
      expect(true).toBe(false);
    } catch (err) {
      expect((err as any).message).toBe(
        'Ocorreu um error ao acessar o servidor',
      );
    }
  });

  it('must be a AxiosError', async () => {
    try {
      mock.onGet('/auth/me').networkErrorOnce();
      const mockedError = await AuthServices.getMe();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
      errorHandler(mockedError);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });
});
