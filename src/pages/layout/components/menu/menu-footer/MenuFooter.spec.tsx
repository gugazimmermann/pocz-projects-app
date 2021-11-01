import { render } from '@testing-library/react';
import MenuFooter from './MenuFooter';

describe('MenuFooter', () => {
  it('should have Preferências text', async () => {
    const { getByText } = render(
      <MenuFooter />,
    );
    expect(getByText('Preferências')).toBeTruthy();
  });
});
