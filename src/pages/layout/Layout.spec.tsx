import faker from 'faker';
import { DateTime } from 'luxon';
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { PlacesServices, ProfilesServices } from '../../services';
import Layout from './Layout';

faker.locale = 'pt_BR';

let history: MemoryHistory;

const DashboardTest = () => <div>Dashboard Text</div>;

const profile = {
  id: faker.datatype.uuid(),
  isAdmin: faker.datatype.boolean(),
  isProfessional: faker.datatype.boolean(),
  avatar: faker.datatype.string(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  zip: faker.address.zipCode(),
  address: faker.address.streetName(),
  number: faker.datatype.number().toString(),
  complement: '',
  neighborhood: faker.address.county(),
  city: faker.address.cityName(),
  state: faker.address.state(),
  subscription: {
    planId: faker.datatype.uuid(),
    type: faker.datatype.string(),
    reason: faker.datatype.string(),
    frequency: 1,
    createdAt: '2021-10-01 18:00:00',
  },
};

const freePlan = process.env.REACT_APP_FREE_PLAN || '';

const endToday = DateTime.now().minus({ days: 15 }).toISODate();
const endIn1 = DateTime.now().minus({ days: 14 }).toISODate();
const endIn5 = DateTime.now().minus({ days: 10 }).toISODate();

const freePlanSubscription = {
  planId: freePlan,
  type: 'professional',
  reason: 'Teste Gratuito',
  frequency: 15,
  createdAt: endToday,
};

describe('Layout', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should have profile, places and dashboard', async () => {
    const getOneSpy = jest
      .spyOn(ProfilesServices, 'getOne')
      .mockResolvedValueOnce(profile);
    const countSpy = jest
      .spyOn(PlacesServices, 'count')
      .mockResolvedValueOnce(1);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    await waitFor(() => expect(getOneSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(countSpy).toHaveBeenCalledTimes(1));
    expect(getByText('Dashboard Text')).toBeTruthy();
  });

  it('should show alert Profile', async () => {
    const getOneSpy = jest
      .spyOn(ProfilesServices, 'getOne')
      .mockRejectedValueOnce({ message: 'Error Get Profile' });
    const countSpy = jest
      .spyOn(PlacesServices, 'count')
      .mockResolvedValueOnce(1);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(getOneSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(countSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByText('Error Get Profile')).toBeTruthy());
  });

  it('should show alert Place', async () => {
    const getOneSpy = jest
      .spyOn(ProfilesServices, 'getOne')
      .mockResolvedValueOnce(profile);
    const countSpy = jest
      .spyOn(PlacesServices, 'count')
      .mockRejectedValueOnce({ message: 'Error Get Place' });
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(getOneSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(countSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByText('Error Get Place')).toBeTruthy());
  });

  it('should have Callout without profile Zip', async () => {
    jest
      .spyOn(ProfilesServices, 'getOne')
      .mockResolvedValueOnce({ ...profile, zip: '' });
    jest.spyOn(PlacesServices, 'count').mockResolvedValueOnce(1);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(
      getByText('Complete o(s) dado(s) abaixo para liberar o sistema.'),
    ).toBeTruthy());
    await waitFor(() => expect(getByText('Incompleto')).toBeTruthy());
  });

  it('should have Callout without places', async () => {
    jest.spyOn(ProfilesServices, 'getOne').mockResolvedValueOnce(profile);
    jest.spyOn(PlacesServices, 'count').mockResolvedValueOnce(0);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(
      getByText('Complete o(s) dado(s) abaixo para liberar o sistema.'),
    ).toBeTruthy());
    await waitFor(() => expect(getByText('Nenhum Escritório Cadastrado')).toBeTruthy());
  });

  it('should have free plan end today', async () => {
    jest.spyOn(ProfilesServices, 'getOne').mockResolvedValueOnce({
      ...profile,
      subscription: { ...freePlanSubscription, createdAt: endToday },
    });
    jest.spyOn(PlacesServices, 'count').mockResolvedValueOnce(1);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(
      getByText('Teste Gratuito termina Hoje.'),
    ).toBeTruthy());
  });

  it('should have free plan end 1 day', async () => {
    jest.spyOn(ProfilesServices, 'getOne').mockResolvedValueOnce({
      ...profile,
      subscription: { ...freePlanSubscription, createdAt: endIn1 },
    });
    jest.spyOn(PlacesServices, 'count').mockResolvedValueOnce(1);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(
      getByText('Teste Gratuito termina em 1 dia.'),
    ).toBeTruthy());
  });

  it('should have free plan end 3 days', async () => {
    jest.spyOn(ProfilesServices, 'getOne').mockResolvedValueOnce({
      ...profile,
      subscription: { ...freePlanSubscription, createdAt: endIn5 },
    });
    jest.spyOn(PlacesServices, 'count').mockResolvedValueOnce(1);
    const { getByText } = render(
      <Router history={history}>
        <Layout>
          <DashboardTest />
        </Layout>
      </Router>,
    );
    await waitFor(() => expect(
      getByText('Teste Gratuito termina em 5 dias.'),
    ).toBeTruthy());
  });
});
