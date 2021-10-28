import { render, screen } from '@testing-library/react';
import { WARNING_TYPES } from '../../libs';
import Callout, { CalloutProps } from './Callout';

const calloutObject: CalloutProps = {
  type: WARNING_TYPES.INFO,
  title: 'Callout Text',
  emphasis: 'Callout Emphasis Text',
  content: 'Callout Content Text',
};

describe('Callout', () => {
  it('renders "Callout Text" test', () => {
    render(<Callout type={calloutObject.type} title={calloutObject.title} />);
    const linkElement = screen.getByText(calloutObject.title);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders "Callout Emphasis Text" test', () => {
    render(
      <Callout
        type={calloutObject.type}
        title={calloutObject.title}
        emphasis={calloutObject.emphasis}
      />,
    );
    const linkElement = screen.getByText(calloutObject.emphasis as string);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders "Callout Content Text" test', () => {
    render(
      <Callout
        type={calloutObject.type}
        title={calloutObject.title}
        content={calloutObject.content}
      />,
    );
    const linkElement = screen.getByText(calloutObject.content as string);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders "Callout Text" test without Type', () => {
    render(<Callout title={calloutObject.title} />);
    const linkElement = screen.getByText(calloutObject.title);
    expect(linkElement).toBeInTheDocument();
  });
});
