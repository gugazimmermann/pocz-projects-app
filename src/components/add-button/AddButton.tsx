/* eslint-disable no-nested-ternary */
import { useHistory } from 'react-router-dom';

export interface AddButtonProps {
  back: boolean;
  backRoute: string | undefined;
  addRoute: string | undefined;
  reload(): void;
  disabled?: boolean;
}

export function AddButton({
  back,
  backRoute,
  addRoute,
  reload,
  disabled,
}: AddButtonProps) {
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={() => {
        if (back) {
          if (backRoute) {
            history.push(backRoute);
          } else {
            reload();
          }
        } else {
          history.push(`${addRoute}`);
        }
      }}
      className={`px-4 py-2 text-sm text-white rounded-md ${
        back
          ? 'bg-secondary-500 hover:bg-secondary-700 '
          : !disabled
            ? 'bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
            : 'bg-gray-300 '
      }`}
      disabled={!back && disabled}
    >
      {back ? 'Listagem' : 'Adicionar'}
    </button>
  );
}

export default AddButton;
