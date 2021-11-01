import { render } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  test('renders "Carregando..."', () => {
    const { getByText } = render(<Loading />);
    expect(getByText('Carregando...')).toBeInTheDocument();
  });
});
