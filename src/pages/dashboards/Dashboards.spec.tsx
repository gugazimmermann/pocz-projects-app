/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from 'faker';
import { render, within, waitFor } from '@testing-library/react';
import routeData, { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory, MemoryHistory } from 'history';
import { PLACES } from '@settings';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from '@routes';
import { Lang } from '@lang';
import { PlacesServices } from '../../services';
import Dashboards from './Dashboards';

faker.locale = 'pt_BR';

let history: MemoryHistory;

const mockPlaces = [
  {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
    active: true,
    managersPlace: [],
    employeesPlace: [],
    clientsPlace: [],
    supliersPlace: [],
    contactsPlace: [],
  },
  {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
    active: true,
    managersPlace: [],
    employeesPlace: [],
    clientsPlace: [],
    supliersPlace: [],
    contactsPlace: [],
  },
];

describe('Dashboard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`Should have Dashboards and ${PLACES.PLURAL}`, async () => {
    const placesSpy = jest
      .spyOn(PlacesServices, 'getAll')
      .mockResolvedValueOnce([]);
    const { getByTestId } = render(
      <MemoryRouter>
        <Dashboards />
      </MemoryRouter>,
    );
    await waitFor(() => expect(placesSpy).toHaveBeenCalledTimes(1));
    const breadcrumb = getByTestId('breadcrumb');
    expect(within(breadcrumb).getByText('Dashboards')).toBeTruthy();
    expect(within(breadcrumb).getByText(PLACES.PLURAL)).toBeTruthy();
    expect(within(breadcrumb).queryByTestId('places')).not.toBeInTheDocument();
  });

  it('Should throw error', async () => {
    const placesSpy = jest
      .spyOn(PlacesServices, 'getAll')
      .mockRejectedValueOnce(new Error(Lang.Errors.ServerError));
    const { getByTestId } = render(
      <MemoryRouter>
        <Dashboards />
      </MemoryRouter>,
    );
    await waitFor(() => expect(placesSpy).toHaveBeenCalledTimes(1));
    expect(
      within(getByTestId('breadcrumb')).queryByTestId('places'),
    ).not.toBeInTheDocument();
  });

  it('should change location when select a place', async () => {
    history = createMemoryHistory();
    const placesSpy = jest
      .spyOn(PlacesServices, 'getAll')
      .mockResolvedValueOnce(mockPlaces);
    const { getByTestId, getByRole } = render(
      <Router history={history}>
        <Dashboards />
      </Router>,
    );
    await waitFor(() => expect(placesSpy).toHaveBeenCalledTimes(1));
    userEvent.selectOptions(
      getByTestId('places'),
      getByRole('option', { name: mockPlaces[0].name }),
      { bubbles: true },
    );
    const option = getByRole('option', { name: mockPlaces[0].name });
    expect((option as HTMLOptionElement).selected).toBeTruthy();
    await waitFor(() => expect(history.location.pathname).toBe(
      `${AppRoutes.DashboardsPlaces}/${mockPlaces[0].id}`,
    ));
  });

  it('should show place info', async () => {
    jest
      .spyOn(routeData, 'useParams')
      .mockReturnValue({ id: mockPlaces[0].id });
    const placeSpy = jest
      .spyOn(PlacesServices, 'getOne')
      .mockResolvedValueOnce(mockPlaces[0]);
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[
          { pathname: `${AppRoutes.Dashboards}/${mockPlaces[0].id}` },
        ]}
      >
        <Dashboards />
      </MemoryRouter>,
    );
    await waitFor(() => expect(placeSpy).toHaveBeenCalledTimes(1));
    const breadcrumb = getByTestId('breadcrumb');
    expect(within(breadcrumb).getByText('Dashboards')).toBeTruthy();
    expect(within(breadcrumb).getByText(mockPlaces[0].name)).toBeTruthy();
  });

  it('should throw error on place info', async () => {
    jest
      .spyOn(routeData, 'useParams')
      .mockReturnValue({ id: mockPlaces[0].id });
    const placeSpy = jest
      .spyOn(PlacesServices, 'getOne')
      .mockRejectedValueOnce(new Error(Lang.Errors.ServerError));
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[
          { pathname: `${AppRoutes.Dashboards}/${mockPlaces[0].id}` },
        ]}
      >
        <Dashboards />
      </MemoryRouter>,
    );
    await waitFor(() => expect(placeSpy).toHaveBeenCalledTimes(1));
    const breadcrumb = getByTestId('breadcrumb');
    expect(within(breadcrumb).getByText('Dashboards')).toBeTruthy();
    expect(within(breadcrumb).getByText(PLACES.PLURAL)).toBeTruthy();
    expect(within(breadcrumb).queryByText(mockPlaces[0].name)).not.toBeInTheDocument();
  });
});
