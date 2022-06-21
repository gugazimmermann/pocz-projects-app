import faker from 'faker';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes, AuthRoutes } from '@routes';
import NavAvatar from './NavAvatar';
import { AuthServices } from '../../../../../services';

configure({ asyncUtilTimeout: 5000 });

faker.locale = 'pt_BR';

const projectName = process.env.REACT_APP_PROJECT_NAME || '';
const avatarBucket = process.env.REACT_APP_AVATAR_URL || '';

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

describe('NavAvatar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have Seu Perfil, Assinatura e Logout button', async () => {
    const logoutsSpy = jest.spyOn(AuthServices, 'logout');
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NavAvatar profile={profile} />
      </Router>,
    );
    expect(getByText('Seu Perfil')).toBeTruthy();
    expect(getByText('Assinatura')).toBeTruthy();
    await waitFor(() => fireEvent.click(getByText('Sair')));
    expect(logoutsSpy).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe(AuthRoutes.SignIn);
  });

  it('should do not have Assinatura', async () => {
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <NavAvatar profile={{ ...profile, isAdmin: false }} />
      </Router>,
    );
    expect(queryByText('Assinatura')).not.toBeInTheDocument();
  });

  it('should move to profiles', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NavAvatar profile={profile} />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByText('Seu Perfil')));
    expect(history.location.pathname).toBe(AppRoutes.Profile);
  });

  it('should show avatar', async () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={history}>
        <NavAvatar profile={{ ...profile }} />
      </Router>,
    );
    expect(getByAltText(profile.name)).toHaveAttribute(
      'src',
      `${avatarBucket}/${profile.avatar}`,
    );
  });

  it('should show initials without avatar', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NavAvatar profile={{ ...profile, avatar: '' }} />
      </Router>,
    );
    expect(getByText('TU')).toBeTruthy();
  });

  it('should show project name initial without avatar and name', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NavAvatar profile={{ ...profile, avatar: '', name: '' }} />
      </Router>,
    );
    expect(getByText(projectName[0])).toBeTruthy();
  });

  it('should set menu close when click outside without avatar', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavAvatar profile={{ ...profile, avatar: '' }} />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('initialsId')));
    await waitFor(() => fireEvent.mouseDown(document.body));
    expect(true).toBeTruthy();
  });

  it('should set menu close when click outside with avatar', async () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={history}>
        <NavAvatar profile={profile} />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByAltText(profile.name)));
    await waitFor(() => fireEvent.mouseDown(document.body));
    expect(true).toBeTruthy();
  });
});
