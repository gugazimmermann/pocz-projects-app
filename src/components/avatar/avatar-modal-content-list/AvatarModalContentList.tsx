/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CheckIcon } from '@icons';
import { IMembersSimple, IPersons } from '@interfaces';
import { useCloseModal } from '@libs';
import AvatarOrInitial from '../avatar-or-initial/AvatarOrInitial';

/* eslint-disable jsx-a11y/click-events-have-key-events */
export interface AvatarModalContentListProps {
  membersList: IMembersSimple[] | IPersons[];
  currentList: IMembersSimple[] | IPersons[];
  handleSelect(p: IMembersSimple | IPersons): void;
  open: boolean;
  setOpen(open: boolean): void;
}

export function AvatarModalContentList({
  membersList,
  currentList,
  handleSelect,
  open,
  setOpen,
}: AvatarModalContentListProps) {
  const ref = useCloseModal({ open, setOpen });
  return (
    <div
      ref={ref}
      className="absolute z-30 -mt-5 w-full rounded-md bg-white shadow-lg"
    >
      <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black/5 overflow-auto focus:outline-none sm:text-sm">
        {membersList.map((p, i) => (
          <li
            key={i}
            className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9"
            onClick={() => {
              handleSelect(p);
              setOpen(false);
            }}
          >
            <div className="flex items-center">
              <AvatarOrInitial
                avatar={p.avatar}
                name={p.name}
                avatarStyle="shrink h-8 w-8"
                initialStyle="shrink h-8 w-8"
              />
              <span className="ml-3 block font-normal truncate">{p.name}</span>
            </div>
            {currentList.some((s) => s.id === p.id) && (
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

export default AvatarModalContentList;
