import {
  fireEvent, render, waitFor,
} from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { MemoryRouter } from 'react-router';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import { AuthServices } from '../../../../services';
import { AuthRoutes } from '../../../../routes';
import SignUp from './SignUp';

configure({ asyncUtilTimeout: 5000 });

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
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    expect(getByLabelText('Nome').className.split(' ')).toContain('focus:border-primary-600');
    expect(getByLabelText('Email').className.split(' ')).toContain('focus:border-primary-600');
    expect(getByLabelText('Senha').className.split(' ')).toContain('focus:border-primary-600');
    expect(getByLabelText('Repita a Senha').className.split(' ')).toContain(
      'focus:border-primary-600',
    );
    await waitFor(() => fireEvent.click(getByText('Avançar')));
    expect(getByLabelText('Nome').className.split(' ')).toContain('border-red-600');
    expect(getByLabelText('Email').className.split(' ')).toContain('border-red-600');
    expect(getByLabelText('Senha').className.split(' ')).toContain('border-red-600');
    expect(getByLabelText('Repita a Senha').className.split(' ')).toContain('border-red-600');
  });

  it('should not submit when email are invalid', async () => {
    const signupSpy = jest.spyOn(AuthServices, 'signup').mockResolvedValueOnce({
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
    await waitFor(() => fireEvent.click(getByText('Avançar')));
    await waitFor(() => expect(signupSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Email inválido!')).toBeTruthy());
  });

  it('should not submit when password are not equal', async () => {
    const signupSpy = jest.spyOn(AuthServices, 'signup').mockResolvedValueOnce({
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
    await waitFor(() => fireEvent.click(getByText('Avançar')));
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
    await waitFor(() => fireEvent.click(getByText('Avançar')));
    expect(history.location.pathname).toBe(AuthRoutes.Plans);
  });
});
