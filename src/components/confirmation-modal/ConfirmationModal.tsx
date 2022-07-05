import { WarningIcon } from '../../icons';
import { warningTypes, WARNING_TYPES } from '../../libs';

export interface ConfirmationModalProps {
  setConfirm(confirm: boolean): void;
  type?: WARNING_TYPES;
  title: string;
  buttonText?: string;
  content: string;
  action(): void;
}

export function ConfirmationModal({
  setConfirm,
  type,
  title,
  buttonText,
  content,
  action,
}: ConfirmationModalProps) {
  const { text, bg } = warningTypes(type || WARNING_TYPES.NONE);
  return (
    <div className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen text-center sm:block">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white p-3 flex flex-row">
            <div>
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full ${bg}`}
              >
                <WarningIcon styles={`h-8 w-8 ${text}`} />
              </div>
            </div>
            <div className="text-left ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{content}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                action();
                setConfirm(false);
              }}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${bg} text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
            >
              {buttonText || 'Sim, desejo excluir'}
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirm(false);
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
