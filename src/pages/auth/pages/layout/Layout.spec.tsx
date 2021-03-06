import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Lang } from '@lang';
import SignIn from '../sign-in/SignIn';
import Layout from './Layout';

const projectName = process.env.REACT_APP_PROJECT_NAME || '';

describe('Footer', () => {
  it('should have header, footer em signin', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout><SignIn /></Layout>
      </MemoryRouter>,
    );
    expect(getByText(projectName)).toBeTruthy();
    expect(getByText(Lang.Auth.Terms)).toBeTruthy();
    expect(getByText(Lang.Auth.SignIn.Title)).toBeTruthy();
  });
});
