import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { WARNING_TYPES } from '../../libs';
import Alert, { AlertInterface } from './Alert';

const alertObject: AlertInterface = {
  show: true,
  message: 'Alert Text',
  type: WARNING_TYPES.ERROR,
  time: 3000,
};

let setShowAlert = jest.fn();

describe('Alert', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  it('renders "Alert Text" test', () => {
    const alertObjectWithOutTime = {
      ...alertObject,
      time: undefined,
    };
    render(<Alert alert={alertObjectWithOutTime} setAlert={setShowAlert} />);
    const linkElement = screen.getByText(alertObject.message);
    expect(linkElement).toBeInTheDocument();
  });

  it('setTimeout must have be called with 3000', () => {
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
    jest.useFakeTimers();
    setShowAlert = jest.fn();
    render(<Alert alert={alertObject} setAlert={setShowAlert} />);
    expect(setShowAlert).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(setShowAlert).toHaveBeenCalledTimes(1);
  });

  it('click button must call setShowAlert', async () => {
    setShowAlert = jest.fn();
    render(<Alert alert={alertObject} setAlert={setShowAlert} />);
    const btn = screen.getByText('Close');
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(setShowAlert).toHaveBeenCalledTimes(1));
  });
});
