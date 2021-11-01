import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthServices } from '../../../../services';
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
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
    expect(getByLabelText('Email').className.split(' ')).toContain(
      'focus:border-primary-600',
    );
    await waitFor(() => fireEvent.click(getByText('Enviar Código')));
    expect(getByLabelText('Email').className.split(' ')).toContain(
      'border-red-600',
    );
  });

  it('should not submit when email are invalid', async () => {
    const forgotpasswordSpy = jest
      .spyOn(AuthServices, 'forgotpassword')
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
    await waitFor(() => fireEvent.click(getByText('Enviar Código')));
    await waitFor(() => expect(forgotpasswordSpy).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(getByText('Email inválido!')).toBeTruthy());
  });

  it('should submit and set alert error', async () => {
    jest
      .spyOn(AuthServices, 'forgotpassword')
      .mockRejectedValueOnce({ message: 'Error Message' });
    const { container, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );
    const email = container.querySelector('input[id="email"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: 'teste@test.com' } }));
    await waitFor(() => fireEvent.click(getByText('Enviar Código')));
    await waitFor(() => {
      expect(getByText('Error Message')).toBeTruthy();
    });
  });

  it('should submit', async () => {
    const forgotpasswordSpy = jest
      .spyOn(AuthServices, 'forgotpassword')
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
    await waitFor(() => fireEvent.click(getByText('Enviar Código')));
    await waitFor(() => {
      expect(forgotpasswordSpy).toHaveBeenCalledTimes(1);
      expect(forgotpasswordSpy).toHaveBeenCalledWith({
        email: 'teste@test.com',
      });
    });
  });
});
