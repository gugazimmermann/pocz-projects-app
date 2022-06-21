import { fireEvent, render, waitFor } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import routeData, { MemoryRouter } from 'react-router';
import faker from 'faker';
import { Lang } from '@lang';
import { AuthServices } from '../../../../services';
import SignIn from './SignIn';

configure({ asyncUtilTimeout: 5000 });

faker.locale = 'pt_BR';

const useLocationMock = {
  pathname: '/',
  key: '',
  search: '',
  hash: '',
  state: {},
};

describe('SignIn', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`should have ${Lang.Auth.SignIn.Title} as the title`, () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(getByText(Lang.Auth.SignIn.Title)).toBeTruthy();
  });

  it('should change input class on missing field', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(getByLabelText('Email').className.split(' ')).toContain(
      'focus:border-primary-600',
    );
    expect(getByLabelText('Senha').className.split(' ')).toContain(
      'focus:border-primary-600',
    );
    await waitFor(() => fireEvent.click(getByText('Entrar')));
    expect(getByLabelText('Email').className.split(' ')).toContain(
      'border-red-600',
    );
    expect(getByLabelText('Senha').className.split(' ')).toContain(
      'border-red-600',
    );
  });

  it('should show change password success alert', async () => {
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue({
        ...useLocationMock,
        state: {
          email: '',
          changePassword: true,
        },
      });
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('Senha alterada com sucesso!')).toBeTruthy();
  });

  it('should show signup success alert', async () => {
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue({
        ...useLocationMock,
        state: {
          email: 'test@test.com',
          changePassword: false,
        },
      });
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('Cadastro realizado com sucesso!')).toBeTruthy();
  });

  it('should show invite accepted alert', async () => {
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue({
        ...useLocationMock,
        state: {
          inviteaccepted: true,
        },
      });
    const { getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('Convite Aceito!')).toBeTruthy();
  });

  it('should not submit when email is invalid', async () => {
    const signinSpy = jest.spyOn(AuthServices, 'signin').mockResolvedValueOnce({
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
    await waitFor(() => fireEvent.click(getByText('Entrar')));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Email inválido!')).toBeTruthy());
  });

  it('should be a error on submit', async () => {
    const signinSpy = jest
      .spyOn(AuthServices, 'signin')
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
    await waitFor(() => fireEvent.click(getByText('Entrar')));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    }));
  });

  it('should submit', async () => {
    const signinSpy = jest.spyOn(AuthServices, 'signin').mockResolvedValueOnce({
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
    await waitFor(() => fireEvent.click(getByText('Entrar')));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(signinSpy).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    }));
  });
});
