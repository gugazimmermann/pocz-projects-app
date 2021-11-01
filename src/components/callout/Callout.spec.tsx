import { render } from '@testing-library/react';
import { WARNING_TYPES } from '../../libs';
import Callout from './Callout';

const calloutObject = {
  type: WARNING_TYPES.INFO,
  title: 'Callout Text',
  emphasis: 'Callout Emphasis Text',
  content: 'Callout Content Text',
};

describe('Callout', () => {
  it('renders "Callout Text" test', () => {
    const { getByText } = render(
      <Callout type={calloutObject.type} title={calloutObject.title} />,
    );
    expect(getByText(calloutObject.title)).toBeInTheDocument();
  });

  it('renders "Callout Emphasis Text" test', () => {
    const { getByText } = render(
      <Callout
        type={calloutObject.type}
        title={calloutObject.title}
        emphasis={calloutObject.emphasis}
      />,
    );
    expect(getByText(calloutObject.emphasis)).toBeInTheDocument();
  });

  it('renders "Callout Content Text" test', () => {
    const { getByText } = render(
      <Callout
        type={calloutObject.type}
        title={calloutObject.title}
        content={calloutObject.content}
      />,
    );
    expect(getByText(calloutObject.content)).toBeInTheDocument();
  });

  it('renders "Callout Text" test without Type', () => {
    const { getByText } = render(<Callout title={calloutObject.title} />);
    expect(getByText(calloutObject.title)).toBeInTheDocument();
  });
});
