import { render, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavMenuButton from './NavMenuButton';

describe('NavMenuButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hit setMenuOpen with true', async () => {
    const setMenuOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavMenuButton setMenuOpen={setMenuOpenMock} menuOpen={false} />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navMenuButtonId')));
    expect(setMenuOpenMock).toHaveBeenCalledTimes(1);
    expect(setMenuOpenMock).toHaveBeenCalledWith(true);
  });

  it('should hit setMenuOpen with false', async () => {
    const setMenuOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavMenuButton setMenuOpen={setMenuOpenMock} menuOpen />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navMenuButtonId')));
    expect(setMenuOpenMock).toHaveBeenCalledTimes(1);
    expect(setMenuOpenMock).toHaveBeenCalledWith(false);
  });
});
