import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  test('renders "Carregando"', () => {
    render(<Loading />);
    const linkElement = screen.getByText(/Carregando/i);
    expect(linkElement).toBeInTheDocument();
  });
});
