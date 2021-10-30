import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as auth from '../../../../services/auth/auth';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have Esqueceu a Senha? as the title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
    expect(getByText('Esqueceu a Senha?')).toBeTruthy();
  });

  it('should change input class on missing field', async () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    const inputNode = screen.getByLabelText('Email');
    expect(
      inputNode.className.split(' '),
    ).toContain('focus:border-primary-600');
    const button = screen.getByText('Enviar Código');
    await waitFor(() => fireEvent.click(button));
    expect(inputNode.className.split(' ')).toContain(
      'border-red-600',
    );
  });

  it('should not submit when email are invalid', async () => {
    const forgotpasswordSpy = jest
      .spyOn(auth, 'forgotpassword')
      .mockReturnValue(
        Promise.resolve({
          email: 'teste@teste.com',
          date: '01/01/2021 18:30:00',
        }),
      );
    const { container, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'teste' } }));
    const button = getByText('Enviar Código');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(forgotpasswordSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Email inválido!')).toBeTruthy());
  });

  it('should submit and set alert error', async () => {
    jest.spyOn(auth, 'forgotpassword').mockRejectedValueOnce({ message: 'Error Message' });
    const { container, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'teste@test.com' } }));
    const button = getByText('Enviar Código');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(getByText('Error Message')).toBeTruthy();
    });
  });

  it('should submit', async () => {
    const forgotpasswordSpy = jest
      .spyOn(auth, 'forgotpassword')
      .mockReturnValue(
        Promise.resolve({
          email: 'teste@teste.com',
          date: '01/01/2021 18:30:00',
        }),
      );
    const { container, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'teste@test.com' } }));
    const button = getByText('Enviar Código');
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(forgotpasswordSpy).toHaveBeenCalled();
      expect(forgotpasswordSpy).toHaveBeenCalledWith({ email: 'teste@test.com' });
    });
  });
});
