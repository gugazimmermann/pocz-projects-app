import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from './Header';

let history: MemoryHistory;
const projectName = process.env.REACT_APP_PROJECT_NAME || '';
const url = process.env.REACT_APP_PROJECT_APP_URL || '';

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
        <Header />
      </Router>,
    );
    expect(getByText(projectName).closest('a')).toHaveAttribute(
      'href',
      `${url}`,
    );
  });
});
