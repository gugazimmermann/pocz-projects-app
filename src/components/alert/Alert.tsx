import { ReactElement, useEffect } from 'react';
import { WARNING_TYPES, warningTypes } from '@libs';

export interface AlertInterface {
  show: boolean;
  type?: WARNING_TYPES;
  message: string;
  time?: number;
}

interface AlertSuccessProps {
  alert: AlertInterface;
  setAlert?(alert: AlertInterface): void;
}

export const DefaultAlert = {
  show: false,
  message: '',
  type: WARNING_TYPES.NONE,
  time: 3000,
};

export function Alert({ alert, setAlert }: AlertSuccessProps): ReactElement {
  const { message, type, time } = alert;

  const { text, bg, border } = warningTypes(type);

  useEffect(() => {
    if (alert && time && setAlert) {
      setTimeout(() => setAlert({ ...alert, show: false }), time);
    }
  }, [alert, setAlert, time]);

  return (
    <div
      className={`relative border-t-4 rounded-b p-2 mb-2 shadow-md ${bg} ${border} ${text}`}
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className={`fill-current h-6 w-6 mr-4 ${text}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold py-1">{message}</p>
          {setAlert && (
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setAlert({ ...alert, show: false })}
            >
              <svg
                className={`fill-current h-6 w-6 ${text}`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alert;
