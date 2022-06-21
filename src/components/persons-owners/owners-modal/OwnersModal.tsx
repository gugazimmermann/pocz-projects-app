import { IProfilesList, IPlaces, IOnwersList } from '@interfaces';
import { useCloseModal } from '@libs';
import { OwnersModalContent } from '..';

export interface OwnersModalProps {
  title: string;
  membersList: IProfilesList[];
  placesList: IPlaces[];
  currentList: IOnwersList[];
  handleSelect(o: IOnwersList): void;
  cancel(): void;
  submit(): void;
  submitText: string;
  open: boolean;
  setOpen(open: boolean): void;
}

export function OwnersModal({
  title,
  membersList,
  placesList,
  currentList,
  handleSelect,
  cancel,
  submit,
  submitText,
  open,
  setOpen,
}: OwnersModalProps) {
  const ref = useCloseModal({ open, setOpen });
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        <div
          ref={ref}
          className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="flex flex-col mx-auto ">
            <OwnersModalContent
              title={title}
              membersList={membersList}
              placesList={placesList}
              currentList={currentList}
              handleSelect={handleSelect}
            />
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse rounded-b-lg">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm bg-primary-500"
                onClick={() => submit()}
              >
                {submitText}
              </button>
              <button
                type="button"
                onClick={() => cancel()}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnersModal;
