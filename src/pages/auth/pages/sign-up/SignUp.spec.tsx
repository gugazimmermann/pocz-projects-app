import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import * as auth from '../../../../services/auth/auth';
import SignUp from './SignUp';
import { AuthRoutes } from '../../../../routes';

faker.locale = 'pt_BR';

describe('SignUp', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have Cadastro as the title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    expect(getByText('Cadastro')).toBeTruthy();
  });

  it('should change input class on missing field', async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    const nome = screen.getByLabelText('Nome');
    expect(nome.className.split(' ')).toContain('focus:border-primary-600');
    const email = screen.getByLabelText('Email');
    expect(email.className.split(' ')).toContain('focus:border-primary-600');
    const password = screen.getByLabelText('Senha');
    expect(password.className.split(' ')).toContain('focus:border-primary-600');
    const repeatPassword = screen.getByLabelText('Repita a Senha');
    expect(repeatPassword.className.split(' ')).toContain(
      'focus:border-primary-600',
    );
    const button = screen.getByText('Avançar');
    await waitFor(() => fireEvent.click(button));
    expect(nome.className.split(' ')).toContain('border-red-600');
    expect(email.className.split(' ')).toContain('border-red-600');
    expect(password.className.split(' ')).toContain('border-red-600');
    expect(repeatPassword.className.split(' ')).toContain('border-red-600');
  });

  it('should not submit when email are invalid', async () => {
    const signupSpy = jest.spyOn(auth, 'signup').mockResolvedValueOnce({
      message: 'ok',
    });
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector(
      'input[id="repeatPassword"]',
    ) as Element;
    await waitFor(() => fireEvent.input(username, { target: { value: 'Test' } }));
    await waitFor(() => fireEvent.input(email, { target: { value: 'teste' } }));
    await waitFor(() => fireEvent.input(password, { target: { value: '123' } }));
    await waitFor(() => fireEvent.input(repeatPassword, { target: { value: '123' } }));
    const button = getByText('Avançar');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signupSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Email inválido!')).toBeTruthy());
  });

  it('should not submit when password are not equal', async () => {
    const signupSpy = jest.spyOn(auth, 'signup').mockResolvedValueOnce({
      message: 'ok',
    });
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector(
      'input[id="repeatPassword"]',
    ) as Element;
    await waitFor(() => fireEvent.input(username, { target: { value: 'Test' } }));
    await waitFor(() => fireEvent.input(email, { target: { value: 'teste@teste.com' } }));
    await waitFor(() => fireEvent.input(password, { target: { value: '123' } }));
    await waitFor(() => fireEvent.input(repeatPassword, { target: { value: '456' } }));
    const button = getByText('Avançar');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signupSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Senhas são diferentes!')).toBeTruthy());
  });

  it('should call history push on submit', async () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>,
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector(
      'input[id="repeatPassword"]',
    ) as Element;
    await waitFor(() => fireEvent.input(username, { target: { value: 'Test' } }));
    await waitFor(() => fireEvent.input(email, { target: { value: 'test@test.com' } }));
    await waitFor(() => fireEvent.input(password, { target: { value: '123' } }));
    await waitFor(() => fireEvent.input(repeatPassword, { target: { value: '123' } }));
    const button = getByText('Avançar');
    await waitFor(() => fireEvent.click(button));
    expect(history.location.pathname).toBe(AuthRoutes.Plans);
  });
});
