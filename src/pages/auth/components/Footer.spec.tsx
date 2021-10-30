import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { SiteRoutes } from '../../../routes';
import Footer from './Footer';

let history: MemoryHistory;
const url = process.env.REACT_APP_PROJECT_WEB_URL;

describe('Footer', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should have Termos text and go to terms url', async () => {
    const { getByText } = render(
      <Router history={history}>
        <Footer />
      </Router>,
    );
    expect(getByText('Termos').closest('a')).toHaveAttribute(
      'href',
      `${url}${SiteRoutes.Terms}`,
    );
  });

  it('should have Privacidade text and go to privacity url', async () => {
    const { getByText } = render(
      <Router history={history}>
        <Footer />
      </Router>,
    );
    expect(getByText('Privacidade').closest('a')).toHaveAttribute(
      'href',
      `${url}${SiteRoutes.Privacity}`,
    );
  });
});
