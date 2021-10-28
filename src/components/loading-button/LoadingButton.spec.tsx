import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoadingButton, { LoadingButtonProps } from './LoadingButton';

const loadingButtonObject: LoadingButtonProps = {
  styles: 'bg-primary-600',
  loadingStyles: 'h-5 w-5',
  type: 'button',
  text: 'Loading Button Text',
  loading: true,
  action: jest.fn(),
};

describe('Loading Button', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  it('renders "Loading Button Text" test', () => {
    render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={loadingButtonObject.loading}
      />,
    );
    const linkElement = screen.getByText(loadingButtonObject.text);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders "Loading Button Text" test with loadingStyles', () => {
    render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        loadingStyles={loadingButtonObject.loadingStyles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={loadingButtonObject.loading}
      />,
    );
    const linkElement = screen.getByText(loadingButtonObject.text);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders "Loading Button Text" test without loading props', () => {
    render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={false}
      />,
    );
    const linkElement = screen.getByText(loadingButtonObject.text);
    expect(linkElement).toBeInTheDocument();
  });

  it('click button must not call action', async () => {
    render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={false}
      />,
    );
    const btn = screen.getByText(loadingButtonObject.text);
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(loadingButtonObject.action).toHaveBeenCalledTimes(0));
  });

  it('click button must call action', async () => {
    render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={false}
        action={loadingButtonObject.action}
      />,
    );
    const btn = screen.getByText(loadingButtonObject.text);
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(loadingButtonObject.action).toHaveBeenCalledTimes(1));
  });
});
