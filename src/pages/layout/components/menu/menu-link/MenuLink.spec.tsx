import {
  render, waitFor, fireEvent,
} from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthRoutes } from '../../../../../routes';
import MenuLink from './MenuLink';

configure({ asyncUtilTimeout: 5000 });

describe('MenuLink', () => {
  it('should change button style', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <MenuLink subitem={{
          name: 'SubItem Name',
          link: AuthRoutes.Plans,
        }}
        />
      </Router>,
    );
    expect(getByText('SubItem Name')).toBeTruthy();
    await waitFor(() => fireEvent.click(getByText('SubItem Name')));
    expect(history.location.pathname).toBe(AuthRoutes.Plans);
  });
});
