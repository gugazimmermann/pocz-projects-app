import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import routeData, { MemoryRouter } from 'react-router';
import faker from 'faker';
import * as auth from '../../../../services/auth/auth';
import SignIn from './SignIn';

faker.locale = 'pt_BR';

describe('SignIn', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have Entre em seu escritório as the title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(getByText('Entre em seu escritório')).toBeTruthy();
  });

  it('should change input class on missing field', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const email = screen.getByLabelText('Email');
    expect(email.className.split(' ')).toContain('focus:border-primary-600');
    const password = screen.getByLabelText('Senha');
    expect(password.className.split(' ')).toContain('focus:border-primary-600');
    const button = screen.getByText('Entrar');
    await waitFor(() => fireEvent.click(button));
    expect(email.className.split(' ')).toContain('border-red-600');
    expect(password.className.split(' ')).toContain('border-red-600');
  });

  it('should show change password success alert', async () => {
    const mockLocation = {
      pathname: '/',
      key: '',
      search: '',
      hash: '',
      state: {
        email: '',
        changePassword: true,
      },
    };
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue(mockLocation);
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('Senha alterada com sucesso!')).toBeTruthy();
  });

  it('should show signup success alert', async () => {
    const mockLocation = {
      pathname: '/',
      key: '',
      search: '',
      hash: '',
      state: {
        email: 'test@test.com',
        changePassword: false,
      },
    };
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue(mockLocation);
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('Cadastro realizado com sucesso!')).toBeTruthy();
  });

  it('should show invite accepted alert', async () => {
    const mockLocation = {
      pathname: '/',
      key: '',
      search: '',
      hash: '',
      state: {
        inviteaccepted: true,
      },
    };
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue(mockLocation);
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('Convite Aceito!')).toBeTruthy();
  });

  it('should not submit when email is invalid', async () => {
    const signinSpy = jest.spyOn(auth, 'signin').mockResolvedValueOnce({
      auth: true,
      status: faker.datatype.string(),
      accessToken: faker.datatype.string(),
      refreshToken: faker.datatype.string(),
      tenant: faker.datatype.uuid(),
    });
    const { container, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'test' } }));
    await waitFor(() => fireEvent.input(password, { target: { value: '123456' } }));
    const button = getByText('Entrar');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Email inválido!')).toBeTruthy());
  });

  it('should be a error on submit', async () => {
    const signinSpy = jest
      .spyOn(auth, 'signin')
      .mockRejectedValueOnce(new Error('Error Msg'));
    const { container, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'test@test.com' } }));
    await waitFor(() => fireEvent.input(password, { target: { value: '123456' } }));
    const button = getByText('Entrar');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    }));
  });

  it('should submit', async () => {
    const signinSpy = jest.spyOn(auth, 'signin').mockResolvedValueOnce({
      auth: true,
      status: faker.datatype.string(),
      accessToken: faker.datatype.string(),
      refreshToken: faker.datatype.string(),
      tenant: faker.datatype.uuid(),
    });
    const { container, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'test@test.com' } }));
    await waitFor(() => fireEvent.input(password, { target: { value: '123456' } }));
    const button = getByText('Entrar');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    }));
  });
});
