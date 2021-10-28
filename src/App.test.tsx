import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('Render SignIn page', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = screen.getByText(/Entre em seu escritório/i);
  expect(linkElement).toBeInTheDocument();
});
