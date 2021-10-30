import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import routeData, { MemoryRouter } from 'react-router';
import * as auth from '../../../../services/auth/auth';
import ChangePassword from './ChangePassword';
import { AuthRoutes } from '../../../../routes';

describe('ChangePassword', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have Mudar Senha as the title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>,
    );
    expect(getByText('Mudar Senha')).toBeTruthy();
  });

  it('should change input class on missing field', async () => {
    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>,
    );

    const inputNode = screen.getByLabelText('Nova Senha');
    expect(inputNode.className.split(' ')).toContain(
      'focus:border-primary-600',
    );
    const button = screen.getByText('Alterar Senha');
    await waitFor(() => fireEvent.click(button));
    expect(inputNode.className.split(' ')).toContain('border-red-600');
  });

  it('should have showInfo alert', async () => {
    const mockLocation = {
      pathname: '/',
      key: '',
      search: '',
      hash: '',
      state: {
        email: 'test@test.com',
        date: '01/01/2000 01:01:01',
      },
    };
    const useLocationSpy = jest
      .spyOn(routeData, 'useLocation')
      .mockReturnValue(mockLocation);
    const { getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>,
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText('test@test.com')).toBeTruthy();
  });

  it('should get code from param', async () => {
    jest
      .spyOn(routeData, 'useParams')
      .mockReturnValue({ urlcode: '123' });
    const getPasswordCodeSpy = jest
      .spyOn(auth, 'getforgotpasswordcode')
      .mockResolvedValueOnce({ code: '123' });
    render(
      <MemoryRouter
        initialEntries={[{ pathname: `${AuthRoutes.ChangePassword}/123` }]}
      >
        <ChangePassword />
      </MemoryRouter>,
    );
    expect(getPasswordCodeSpy).toHaveBeenCalled();
  });

  it('should throw error when get code from param', async () => {
    jest
      .spyOn(routeData, 'useParams')
      .mockReturnValue({ urlcode: '123' });
    const getPasswordCodeSpy = jest
      .spyOn(auth, 'getforgotpasswordcode')
      .mockReturnValue(Promise.reject());
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[{ pathname: `${AuthRoutes.ChangePassword}/123` }]}
      >
        <ChangePassword />
      </MemoryRouter>,
    );
    await waitFor(() => expect(getPasswordCodeSpy).toHaveBeenCalled());
    await waitFor(() => expect(
      getByText('Não foi possível recuperar o código, verifique seu email.'),
    ).toBeTruthy());
  });

  it('should not submit when password are not equal', async () => {
    const changepasswordSpy = jest
      .spyOn(auth, 'changepassword');
    const { container, getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>,
    );
    const code = container.querySelector('input[id="code"]') as Element;
    const newpassword = container.querySelector(
      'input[id="newpassword"]',
    ) as Element;
    const repeatnewpassword = container.querySelector(
      'input[id="repeatnewpassword"]',
    ) as Element;
    await waitFor(() => fireEvent.input(code, { target: { value: '123' } }));
    await waitFor(() => fireEvent.input(newpassword, { target: { value: '456' } }));
    await waitFor(() => fireEvent.input(repeatnewpassword, { target: { value: '789' } }));
    const button = getByText('Alterar Senha');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(changepasswordSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Senhas são diferentes!')).toBeTruthy());
  });

  it('should submit and set alert error', async () => {
    jest.spyOn(auth, 'changepassword').mockRejectedValueOnce({ message: 'Error Message' });
    const { container, getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>,
    );
    const code = container.querySelector('input[id="code"]') as Element;
    const newpassword = container.querySelector(
      'input[id="newpassword"]',
    ) as Element;
    const repeatnewpassword = container.querySelector(
      'input[id="repeatnewpassword"]',
    ) as Element;
    await waitFor(() => fireEvent.input(code, { target: { value: '123' } }));
    await waitFor(() => fireEvent.input(newpassword, { target: { value: '456' } }));
    await waitFor(() => fireEvent.input(repeatnewpassword, { target: { value: '456' } }));
    const button = getByText('Alterar Senha');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(getByText('Error Message')).toBeTruthy();
    });
  });

  it('should submit', async () => {
    const changepasswordSpy = jest
      .spyOn(auth, 'changepassword')
      .mockResolvedValueOnce({ message: 'ok' });
    const { container, getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>,
    );
    const code = container.querySelector('input[id="code"]') as Element;
    const newpassword = container.querySelector(
      'input[id="newpassword"]',
    ) as Element;
    const repeatnewpassword = container.querySelector(
      'input[id="repeatnewpassword"]',
    ) as Element;
    await waitFor(() => fireEvent.input(code, { target: { value: '123' } }));
    await waitFor(() => fireEvent.input(newpassword, { target: { value: '456' } }));
    await waitFor(() => fireEvent.input(repeatnewpassword, { target: { value: '456' } }));
    const button = getByText('Alterar Senha');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(changepasswordSpy).toHaveBeenCalled();
      expect(changepasswordSpy).toHaveBeenCalledWith({ codeNumber: '123', password: '456' });
    });
  });
});
