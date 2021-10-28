/* eslint-disable jest/no-conditional-expect */
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import api from '../../api';
import * as SubscriptionsServices from './subscriptions';
import { IPlan, ISubscription } from '../../interfaces/subscriptions';

faker.locale = 'pt_BR';

const getPlansRes = {
  id: faker.datatype.uuid(),
};

const getSubscriptionRes = {
  planId: faker.datatype.uuid(),
  reason: faker.datatype.string(),
  frequency: faker.datatype.number(),
  frequencyType: faker.datatype.string(),
  transactionAmount: faker.datatype.number(),
  status: faker.datatype.boolean(),
};

const getPaymentsRes = [
  {
    transactionAmount: faker.datatype.number(),
    status: faker.datatype.string(),
    paidDate: faker.datatype.string(),
  },
];

const getCreditcardsRes = [
  {
    name: faker.name.firstName(),
    firstSixDigits: faker.datatype.string(),
    lastFourDigits: faker.datatype.string(),
    expirationMonth: faker.datatype.string(),
    expirationYear: faker.datatype.string(),
    status: faker.datatype.boolean(),
  },
];

describe('Subscriptions Services', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
    jest.restoreAllMocks();
  });

  it('getPlans must return getPlansRes', async () => {
    try {
      mock.onGet('/auth/plans').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getPlansRes]), 200);
        }),
      );
      const data = await SubscriptionsServices.getPlans();
      expect((data as IPlan).id).toBe(getPlansRes.id);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getPlans must return axios error', async () => {
    try {
      mock.onGet('/auth/plans').networkErrorOnce();
      const mockedError = await SubscriptionsServices.getPlans();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getSubscription must return getSubscriptionRes', async () => {
    try {
      mock.onGet('/auth/subscription').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getSubscriptionRes]), 200);
        }),
      );
      const data = await SubscriptionsServices.getSubscription();
      expect((data as ISubscription).planId).toBe(getSubscriptionRes.planId);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getSubscription must return axios error', async () => {
    try {
      mock.onGet('/auth/subscription').networkErrorOnce();
      const mockedError = await SubscriptionsServices.getSubscription();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getPayments must return getPaymentsRes', async () => {
    try {
      mock.onGet('/auth/payments').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getPaymentsRes]), 200);
        }),
      );
      const data = await SubscriptionsServices.getPayments();
      expect(data).toHaveLength(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getPayments must return axios error', async () => {
    try {
      mock.onGet('/auth/payments').networkErrorOnce();
      const mockedError = await SubscriptionsServices.getPayments();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getCreditcards must return getCreditcardsRes', async () => {
    try {
      mock.onGet('/auth/credit-cards').reply(
        () => new Promise((resolve) => {
          setTimeout(() => resolve([200, getCreditcardsRes]), 200);
        }),
      );
      const data = await SubscriptionsServices.getCreditcards();
      expect(data).toHaveLength(1);
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });

  it('getCreditcards must return axios error', async () => {
    try {
      mock.onGet('/auth/credit-cards').networkErrorOnce();
      const mockedError = await SubscriptionsServices.getCreditcards();
      expect(axios.isAxiosError(mockedError)).toBeTruthy();
    } catch (err) {
      expect((err as any).message).toBe('');
    }
  });
});
