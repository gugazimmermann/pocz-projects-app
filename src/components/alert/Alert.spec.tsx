import { fireEvent, render, waitFor } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import { WARNING_TYPES } from '../../libs';
import Alert from './Alert';

configure({ asyncUtilTimeout: 5000 });

const alertObject = {
  show: true,
  message: 'Alert Text',
  type: WARNING_TYPES.ERROR,
  time: 3000,
};

describe('Alert', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders "Alert Text" test', () => {
    const setShowAlert = jest.fn();
    const alertObjectWithOutTime = {
      ...alertObject,
      time: undefined,
    };
    const { getByText } = render(
      <Alert alert={alertObjectWithOutTime} setAlert={setShowAlert} />,
    );
    expect(getByText(alertObject.message)).toBeInTheDocument();
  });

  it('setTimeout must have be called with 3000', () => {
    const setShowAlert = jest.fn();
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    render(<Alert alert={alertObject} setAlert={setShowAlert} />);
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      alertObject.time,
    );
  });

  it('setShowAlert must have be called', () => {
    const setShowAlert = jest.fn();
    jest.useFakeTimers();
    render(<Alert alert={alertObject} setAlert={setShowAlert} />);
    expect(setShowAlert).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(setShowAlert).toHaveBeenCalledTimes(1);
  });

  it('click button must call setShowAlert', async () => {
    const setShowAlert = jest.fn();
    const { getByText } = render(
      <Alert alert={alertObject} setAlert={setShowAlert} />,
    );
    await waitFor(() => fireEvent.click(getByText('Close')));
    await waitFor(() => expect(setShowAlert).toHaveBeenCalledTimes(1));
  });
});
