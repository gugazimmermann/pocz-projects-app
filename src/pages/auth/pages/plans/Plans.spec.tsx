/* eslint-disable jest/no-conditional-expect */
import { render, waitFor, fireEvent } from '@testing-library/react';
import routeData, { Router } from 'react-router';
import { createMemoryHistory, MemoryHistory } from 'history';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { AuthRoutes } from '@routes';
import { Lang } from '@lang';
import { AuthServices, SubscriptionsServices } from '../../../../services';
import Plans from './Plans';

faker.locale = 'pt_BR';

const mockLocation = {
  pathname: '/',
  key: '',
  search: '',
  hash: '',
  state: {
    form: {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: '12345',
      repeatPassword: '12345',
    },
  },
};

const getPlans = [
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: 'teste',
    collectorId: 0,
    applicationId: 0,
    reason: 'Teste Gratuito',
    status: 'active',
    initPoint: 'teste',
    frequency: 15,
    frequencyType: 'days',
    transactionAmount: 0,
    currencyId: 'BRL',
    type: 'professional',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: '2c9380847b629308017bdb9d01655e5d',
    collectorId: 139586911,
    applicationId: 416943132752098,
    reason: 'Iustitia Básico Mensal',
    status: 'active',
    initPoint:
      'https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629308017bdb9d01655e5d',
    frequency: 1,
    frequencyType: 'months',
    transactionAmount: 49.9,
    currencyId: 'BRL',
    type: 'basic',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: '2c9380847b629336017bdb9d9f195f79',
    collectorId: 139586911,
    applicationId: 416943132752098,
    reason: 'Iustitia Profissional Mensal',
    status: 'active',
    initPoint:
      'https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629336017bdb9d9f195f79',
    frequency: 1,
    frequencyType: 'months',
    transactionAmount: 99.9,
    currencyId: 'BRL',
    type: 'professional',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: '2c9380847b62931d017bdb9e23cc5ed5',
    collectorId: 139586911,
    applicationId: 416943132752098,
    reason: 'Iustitia Básico Semestral',
    status: 'active',
    initPoint:
      'https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b62931d017bdb9e23cc5ed5',
    frequency: 6,
    frequencyType: 'months',
    transactionAmount: 274.45,
    currencyId: 'BRL',
    type: 'basic',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: '2c9380847b629336017bdb9e7e0c5f7a',
    collectorId: 139586911,
    applicationId: 416943132752098,
    reason: 'Iustitia Profissional Semestral',
    status: 'active',
    initPoint:
      'https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629336017bdb9e7e0c5f7a',
    frequency: 6,
    frequencyType: 'months',
    transactionAmount: 549.45,
    currencyId: 'BRL',
    type: 'professional',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: '2c9380847b62931d017bdb9eea105ed6',
    collectorId: 139586911,
    applicationId: 416943132752098,
    reason: 'Iustitia Básico Anual',
    status: 'active',
    initPoint:
      'https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b62931d017bdb9eea105ed6',
    frequency: 12,
    frequencyType: 'months',
    transactionAmount: 499,
    currencyId: 'BRL',
    type: 'basic',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
  {
    id: faker.datatype.uuid(),
    preapprovalPlanId: '2c9380847b629308017bdb9f3d5e5e5e',
    collectorId: 139586911,
    applicationId: 416943132752098,
    reason: 'Iustitia Profissional Anual',
    status: 'active',
    initPoint:
      'https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=2c9380847b629308017bdb9f3d5e5e5e',
    frequency: 12,
    frequencyType: 'months',
    transactionAmount: 999,
    currencyId: 'BRL',
    type: 'professional',
    createdAt: '2022-06-22T11:56:32.427Z',
    updatedAt: '2022-06-22T11:56:32.427Z',
  },
];

let history: MemoryHistory;

describe('Plans', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have Selecione seu Plano as the title', async () => {
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValueOnce(mockLocation);
    const { getByText } = render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    expect(getByText('Selecione seu Plano')).toBeTruthy();
    await waitFor(() => expect(useLocationSpy).toHaveBeenCalledTimes(1));
  });

  it('should show error when api is down', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const subscriptionsSpy = jest
      .spyOn(SubscriptionsServices, 'getPlans')
      .mockRejectedValueOnce(new Error(Lang.Errors.ServerError));
    const { getByText } = render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    await waitFor(() => expect(subscriptionsSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByText(Lang.Errors.ServerError)).toBeTruthy());
  });

  it('should receive all plans and display plan info', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const subscriptionsSpy = jest
      .spyOn(SubscriptionsServices, 'getPlans')
      .mockResolvedValueOnce(getPlans);
    const { container, getByRole, getAllByRole } = render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    await waitFor(() => expect(subscriptionsSpy).toHaveBeenCalledTimes(1));
    const options = getAllByRole('option');
    getPlans.forEach((plan, index) => {
      userEvent.selectOptions(getByRole('combobox'), [plan.id], {
        bubbles: true,
      });
      options.forEach((option, i) => {
        if (i === index) {
          expect((option as HTMLOptionElement).selected).toBeTruthy();
        } else {
          expect((option as HTMLOptionElement).selected).toBeFalsy();
        }
      });
      expect(container.getElementsByClassName('uppercase')).toBeTruthy();
    });
  });

  it('should register in free plan', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const authSpy = jest
      .spyOn(AuthServices, 'signup')
      .mockResolvedValueOnce({ message: 'ok' });
    const subscriptionsSpy = jest
      .spyOn(SubscriptionsServices, 'getPlans')
      .mockResolvedValueOnce(getPlans);
    const { getByText, getByRole, getAllByRole } = render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    await waitFor(() => expect(subscriptionsSpy).toHaveBeenCalledTimes(1));
    const options = getAllByRole('option');
    userEvent.selectOptions(getByRole('combobox'), [getPlans[0].id], {
      bubbles: true,
    });
    expect((options[0] as HTMLOptionElement).selected).toBeTruthy();
    fireEvent.click(getByText('Avançar'));
    await waitFor(() => expect(authSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(history.location.pathname).toBe(AuthRoutes.SignIn));
  });

  it('should move foward with paid plan', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const subscriptionsSpy = jest
      .spyOn(SubscriptionsServices, 'getPlans')
      .mockResolvedValueOnce(getPlans);
    const { getByText, getByRole, getAllByRole } = render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    await waitFor(() => expect(subscriptionsSpy).toHaveBeenCalledTimes(1));
    const options = getAllByRole('option');
    userEvent.selectOptions(getByRole('combobox'), [getPlans[2].id], {
      bubbles: true,
    });
    expect((options[2] as HTMLOptionElement).selected).toBeTruthy();
    fireEvent.click(getByText('Avançar'));
    await waitFor(() => expect(history.location.pathname).toBe(AuthRoutes.Subscription));
  });

  it('should go back to signUp without form data', async () => {
    render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    expect(history.location.pathname).toBe(AuthRoutes.SignUp);
  });
});
