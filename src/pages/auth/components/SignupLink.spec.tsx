import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthRoutes } from '../../../routes';
import SignupLink from './SignupLink';

let history: MemoryHistory;

describe('SignupLink', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render text and send to link', async () => {
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
