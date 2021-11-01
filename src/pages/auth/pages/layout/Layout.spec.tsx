import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignIn from '../sign-in/SignIn';
import Layout from './Layout';

let history: MemoryHistory;
const projectName = process.env.REACT_APP_PROJECT_NAME || '';

describe('Footer', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should have header, footer em signin', async () => {
    const { getByText } = render(
      <Router history={history}>
        <Layout><SignIn /></Layout>
      </Router>,
    );
    expect(getByText(projectName)).toBeTruthy();
    expect(getByText('Termos')).toBeTruthy();
    expect(getByText('Entre em seu escritório')).toBeTruthy();
  });
});
