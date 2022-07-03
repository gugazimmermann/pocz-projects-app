import { render, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavMobileButton from './NavMobileButton';

describe('NavMobileButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hit setNavOpen with true', async () => {
    const setNavOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavMobileButton setNavOpen={setNavOpenMock} navOpen={false} />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navMobileButtonId')));
    expect(setNavOpenMock).toHaveBeenCalledTimes(1);
    expect(setNavOpenMock).toHaveBeenCalledWith(true);
  });

  it('should hit setNavOpen with false', async () => {
    const setNavOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavMobileButton setNavOpen={setNavOpenMock} navOpen />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navMobileButtonId')));
    expect(setNavOpenMock).toHaveBeenCalledTimes(1);
    expect(setNavOpenMock).toHaveBeenCalledWith(false);
  });
});
