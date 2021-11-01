import { render, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavItem, { NAVICONS } from './NavItem';

describe('NavAvatar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have mock NOTIFICATION', async () => {
    const openMock = jest.fn();
    const history = createMemoryHistory();
    const { queryByText, getByTestId } = render(
      <Router history={history}>
        <NavItem
          item="NOTIFICATION"
          icon={NAVICONS.NOTIFICATION}
          alert
          open={openMock}
          openState
        />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navitem-id')));
    expect(openMock).toHaveBeenCalledTimes(1);
    expect(queryByText('Open NOTIFICATION')).toBeInTheDocument();
  });

  it('should have mock SEARCH', async () => {
    const history = createMemoryHistory();
    const { queryByText, getByTestId } = render(
      <Router history={history}>
        <NavItem
          item="SEARCH"
          icon={NAVICONS.SEARCH}
          alert={false}
        />
      </Router>,
    );
    await waitFor(() => fireEvent.click(getByTestId('navitem-id')));
    expect(queryByText('Open SEARCH')).toBeInTheDocument();
  });

  it('should have mock SETTINGS', async () => {
    const history = createMemoryHistory();
    const { queryByText } = render(
      <Router history={history}>
        <NavItem
          item="SETTINGS"
          icon={NAVICONS.SETTINGS}
          alert={false}
        />
      </Router>,
    );
    expect(queryByText('Open SETTINGS')).toBeInTheDocument();
  });
});
