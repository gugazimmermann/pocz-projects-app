import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthRoutes } from '../../../routes';
import SignupLink from './SignupLink';

describe('SignupLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render text and send to link', async () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <SignupLink />
      </Router>,
    );
    expect(getByText('Não tem uma conta?')).toBeTruthy();
    fireEvent.click(getByTestId('signupLinkId'));
    expect(history.location.pathname).toBe(AuthRoutes.SignUp);
  });
});
