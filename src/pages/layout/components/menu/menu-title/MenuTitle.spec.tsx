import {
  render, waitFor, fireEvent,
} from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '@routes';
import MenuTitle from './MenuTitle';

configure({ asyncUtilTimeout: 5000 });

const projectName = process.env.REACT_APP_PROJECT_NAME || '';

describe('MenuTitle', () => {
  it('should change button style', async () => {
    const history = createMemoryHistory();
    const setMenuOpenMock = jest.fn();
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <MenuTitle setMenuOpen={setMenuOpenMock} menuOpen={false} />
      </Router>,
    );
    expect(getByText(projectName)).toBeTruthy();
    await waitFor(() => fireEvent.click(getByTestId('menutitleId')));
    expect(setMenuOpenMock).toHaveBeenCalledTimes(1);
    await waitFor(() => fireEvent.click(getByText(projectName)));
    expect(history.location.pathname).toBe(AppRoutes.Dashboards);
  });
});
