import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const projectName = process.env.REACT_APP_PROJECT_NAME || '';
const url = process.env.REACT_APP_PROJECT_APP_URL || '';

describe('Footer', () => {
  it('should have Termos text and go to terms url', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(getByText(projectName).closest('a')).toHaveAttribute(
      'href',
      `${url}`,
    );
  });
});
