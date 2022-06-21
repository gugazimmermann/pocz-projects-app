import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Lang } from '@lang';
import { SiteRoutes } from '@routes';
import Footer from './Footer';

const url = process.env.REACT_APP_PROJECT_WEB_URL;

describe('Footer', () => {
  it(`should have ${Lang.Auth.Terms} text and go to terms url`, async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(getByText(Lang.Auth.Terms).closest('a')).toHaveAttribute(
      'href',
      `${url}${SiteRoutes.Terms}`,
    );
  });

  it(`should have ${Lang.Auth.Privacity} text and go to privacity url`, async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(getByText(Lang.Auth.Privacity).closest('a')).toHaveAttribute(
      'href',
      `${url}${SiteRoutes.Privacity}`,
    );
  });
});
