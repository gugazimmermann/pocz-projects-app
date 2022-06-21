/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { CheckIcon } from '@icons';
import { IProfilesList, IPlaces, IOnwersList } from '@interfaces';
import { useCloseModal } from '@libs';

export interface OwnersModalContentListProps {
  membersList: IProfilesList[];
  placesList: IPlaces[];
  currentList: IOnwersList[];
  handleSelect(p: IOnwersList): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function OwnersModalContentList({
  membersList,
  placesList,
  currentList,
  handleSelect,
  open,
  setOpen,
}: OwnersModalContentListProps) {
  const ref = useCloseModal({ open, setOpen });
  const [all, setAll] = useState<IOnwersList[]>([]);

  useEffect(() => {
    const data: IOnwersList[] = [];
    membersList.forEach((m) => data.push({ id: m.id, name: m.name, type: 'person' }));
    placesList.forEach((p) => data.push({ id: p.id, name: p.name, type: 'place' }));
    setAll(data);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute z-30 -mt-5 w-full rounded-md bg-white shadow-lg"
    >
      <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        {all.map((x, i) => (
          <li
            key={i}
            className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
            onClick={() => {
              handleSelect(x);
              setOpen(false);
            }}
          >
            <div className="flex items-center">
              <span className="ml-3 block font-normal truncate">{x.name}</span>
            </div>
            {currentList.some((s) => s.id === x.id) && (
              <span className="absolute inset-y-0 right-0 flex items-center">
                <CheckIcon styles="h-8 w-8 text-secondary-500" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnersModalContentList;
