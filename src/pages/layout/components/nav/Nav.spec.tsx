import faker from 'faker';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Nav from './Nav';

configure({ asyncUtilTimeout: 5000 });

faker.locale = 'pt_BR';

const profile = {
  id: faker.datatype.uuid(),
  isAdmin: true,
  isProfessional: faker.datatype.boolean(),
  avatar: faker.datatype.string(),
  name: 'Test User',
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

describe('Nav', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have Notification, Search and Settings', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getAllByText } = render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen={false}
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={profile}
          places={1}
        />
      </Router>,
    );
    expect(getAllByText('Open Notification')).toBeTruthy();
    expect(getAllByText('Open Search')).toBeTruthy();
    expect(getAllByText('Open Settings')).toBeTruthy();
  });

  it('should have Notification and Search, and not Settings', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getAllByText, queryByText } = render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen={false}
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={{ ...profile, isAdmin: false }}
          places={1}
        />
      </Router>,
    );
    expect(getAllByText('Open Notification')).toBeTruthy();
    expect(getAllByText('Open Search')).toBeTruthy();
    expect(queryByText('Open Settings')).toBeFalsy();
  });

  it('should not have Notification, Search and Settings', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen={false}
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={{ ...profile, zip: '' }}
          places={1}
        />
      </Router>,
    );
    expect(queryByText('Open Notification')).toBeFalsy();
    expect(queryByText('Open Search')).toBeFalsy();
    expect(queryByText('Open Settings')).toBeFalsy();
  });

  it('should not have Notification, Search and Settings with places 0', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={profile}
          places={0}
        />
      </Router>,
    );
    expect(queryByText('Open Notification')).toBeFalsy();
    expect(queryByText('Open Search')).toBeFalsy();
    expect(queryByText('Open Settings')).toBeFalsy();
  });

  it('should set mobile nav open', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    const { getByTestId } = render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen={false}
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={profile}
          places={1}
        />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navMobileButtonId')));
    await waitFor(() => expect(setNavOpenMock).toHaveBeenCalledWith(true));
  });

  it('should set mobile nav close when click outside', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={profile}
          places={1}
        />
      </Router>,
    );
    await waitFor(() => fireEvent.mouseDown(document.body));
    await waitFor(() => expect(setNavOpenMock).toHaveBeenCalledWith(false));
  });

  it('should not set mobile nav close when click outside and nav is closed', async () => {
    const setMenuOpenMock = jest.fn();
    const setNavOpenMock = jest.fn();
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    render(
      <Router history={history}>
        <Nav
          setMenuOpen={setMenuOpenMock}
          menuOpen={false}
          setNavOpen={setNavOpenMock}
          navOpen={false}
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
          profile={profile}
          places={1}
        />
      </Router>,
    );
    await waitFor(() => fireEvent.mouseDown(document.body));
    await waitFor(() => expect(setNavOpenMock).toHaveBeenCalledTimes(0));
  });
});
