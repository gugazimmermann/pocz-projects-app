import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteRoutes } from '../../../routes';
import Footer from './Footer';

const url = process.env.REACT_APP_PROJECT_WEB_URL;

describe('Footer', () => {
  it('should have Termos text and go to terms url', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(getByText('Termos').closest('a')).toHaveAttribute(
      'href',
      `${url}${SiteRoutes.Terms}`,
    );
  });

  it('should have Privacidade text and go to privacity url', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(getByText('Privacidade').closest('a')).toHaveAttribute(
      'href',
      `${url}${SiteRoutes.Privacity}`,
    );
  });
});
