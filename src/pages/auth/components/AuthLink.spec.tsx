import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthRoutes } from '../../../routes';
import AuthLink from './AuthLink';

let history: MemoryHistory;

describe('AuthLink', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render text and send to link', async () => {
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <AuthLink link={AuthRoutes.SignIn} text="Test Text" />
      </Router>,
    );
    expect(getByText('Test Text')).toBeTruthy();
    fireEvent.click(getByTestId('routerlinkTestId'));
    expect(history.location.pathname).toBe(AuthRoutes.SignIn);
  });
});
