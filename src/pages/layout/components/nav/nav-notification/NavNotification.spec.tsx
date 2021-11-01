import { render, waitFor, fireEvent } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavNotification from './NavNotification';

configure({ asyncUtilTimeout: 5000 });

describe('NavNotification', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hit setNotificationOpen with true and section is hidden', async () => {
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavNotification
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen={false}
        />
      </Router>,
    );
    expect(
      getByTestId('navNotificationSectionId').className.split(' '),
    ).toContain('hidden');
    await waitFor(() => fireEvent.click(getByTestId('navNotificationId')));
    expect(setNotificationOpenMock).toHaveBeenCalledTimes(1);
    expect(setNotificationOpenMock).toHaveBeenCalledWith(true);
  });

  it('should hit setNotificationOpen with false and section is not hidden', async () => {
    const setNotificationOpenMock = jest.fn();
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <NavNotification
          setNotificationOpen={setNotificationOpenMock}
          notificationOpen
        />
      </Router>,
    );
    expect(
      getByTestId('navNotificationSectionId').className.split(' '),
    ).not.toContain('hidden');
    await waitFor(() => fireEvent.click(getByTestId('navNotificationId')));
    expect(setNotificationOpenMock).toHaveBeenCalledTimes(1);
    expect(setNotificationOpenMock).toHaveBeenCalledWith(false);
  });
});
