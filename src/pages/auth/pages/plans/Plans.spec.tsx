import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { configure } from '@testing-library/dom';
import routeData from 'react-router';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { AuthServices, SubscriptionsServices } from '../../../../services';
import { AuthRoutes } from '../../../../routes';
import Plans from './Plans';

configure({ asyncUtilTimeout: 5000 });

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
    reason: 'basico',
    transactionAmount: 49.9,
    currencyId: 'BRL',
  },
  {
    id: faker.datatype.uuid(),
    reason: 'profissional',
    transactionAmount: 99.9,
    currencyId: 'BRL',
  },
  {
    id: faker.datatype.uuid(),
    reason: 'gratuito',
    transactionAmount: 0,
    currencyId: 'BRL',
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

  it('should have Selecione seu Plano as the title', () => {
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValueOnce(mockLocation);
    const { getByText } = render(
      <Router history={history}>
        <Plans />
      </Router>,
    );
    expect(getByText('Selecione seu Plano')).toBeTruthy();
    expect(useLocationSpy).toHaveBeenCalledTimes(1);
  });

  it('should receive all plans and call handleFoward', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const subscriptionsSpy = jest
      .spyOn(SubscriptionsServices, 'getPlans')
      .mockResolvedValueOnce(getPlans);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const authSpy = jest
      .spyOn(AuthServices, 'signup')
      .mockResolvedValueOnce({ message: 'ok' });
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
    expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[2] as HTMLOptionElement).selected).toBeFalsy();

    userEvent.selectOptions(screen.getByRole('combobox'), [getPlans[1].id], {
      bubbles: true,
    });
    expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[1] as HTMLOptionElement).selected).toBeTruthy();
    expect((options[2] as HTMLOptionElement).selected).toBeFalsy();

    await waitFor(() => fireEvent.click(getByText('Avançar')));
    expect(history.location.pathname).toBe(AuthRoutes.Subscription);

    userEvent.selectOptions(screen.getByRole('combobox'), [getPlans[2].id], {
      bubbles: true,
    });
    expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[2] as HTMLOptionElement).selected).toBeTruthy();

    // await waitFor(() => fireEvent.click(getByText('Avançar')));
    // await waitFor(() => expect(authSpy).toHaveBeenCalledTimes(1));
    // expect(history.location.pathname).toBe(AuthRoutes.SignIn);
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
