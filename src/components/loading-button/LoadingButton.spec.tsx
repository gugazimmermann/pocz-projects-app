import { fireEvent, render, waitFor } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import LoadingButton, { LoadingButtonProps } from './LoadingButton';

configure({ asyncUtilTimeout: 5000 });

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
    jest.clearAllMocks();
  });

  it('renders "Loading Button Text" test', () => {
    const { getByText } = render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={loadingButtonObject.loading}
      />,
    );
    expect(getByText(loadingButtonObject.text)).toBeInTheDocument();
  });

  it('renders "Loading Button Text" test with loadingStyles', () => {
    const { getByText } = render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        loadingStyles={loadingButtonObject.loadingStyles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={loadingButtonObject.loading}
      />,
    );
    expect(getByText(loadingButtonObject.text)).toBeInTheDocument();
  });

  it('renders "Loading Button Text" test without loading props', () => {
    const { getByText } = render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={false}
      />,
    );
    expect(getByText(loadingButtonObject.text)).toBeInTheDocument();
  });

  it('click button must not call action', async () => {
    const { getByText } = render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={false}
      />,
    );
    await waitFor(() => fireEvent.click(getByText(loadingButtonObject.text)));
    await waitFor(() => expect(loadingButtonObject.action).toHaveBeenCalledTimes(0));
  });

  it('click button must call action', async () => {
    const { getByText } = render(
      <LoadingButton
        styles={loadingButtonObject.styles}
        type={loadingButtonObject.type}
        text={loadingButtonObject.text}
        loading={false}
        action={loadingButtonObject.action}
      />,
    );
    await waitFor(() => fireEvent.click(getByText(loadingButtonObject.text)));
    await waitFor(() => expect(loadingButtonObject.action).toHaveBeenCalledTimes(1));
  });
});
