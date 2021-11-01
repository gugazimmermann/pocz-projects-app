import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('App', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const linkElement = getByText('Entre em seu escritório');
    expect(linkElement).toBeInTheDocument();
  });
});
