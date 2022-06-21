/* eslint-disable no-nested-ternary */
import { Dispatch, SetStateAction } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '../../icons';
import { SORT_TYPES } from '../../libs';

export interface ListHeaderItems {
  name: string;
  align?: 'left' | 'right' | 'center';
  sort?: boolean;
  field?: string;
}

export interface ListHeaderProps {
  items: ListHeaderItems[];
  sort: { type: SORT_TYPES; field: string };
  setSort: Dispatch<
    SetStateAction<{
      type: SORT_TYPES;
      field: string;
    }>
  >;
}

export function ListHeader({ items, sort, setSort }: ListHeaderProps) {
  function handleSort(type: SORT_TYPES, field: string) {
    setSort({ type, field });
  }

  return (
    <thead>
      <tr className="bg-primary-500 text-white uppercase align-baseline">
        {items.map((item, i) => (
          <th
            key={i}
            className={`py-2 px-2 text-sm ${
              item.align === 'center'
                ? 'text-center'
                : item.align === 'right'
                  ? 'text-right'
                  : 'text-left'
            }`}
          >
            {item.name}
            {item.sort && item.field && sort.type === SORT_TYPES.ASC && (
              <button
                type="button"
                onClick={() => handleSort(SORT_TYPES.DESC, (item.field as string))}
              >
                <ArrowDownIcon styles="h-4 w-4 inline" stroke={2} />
              </button>
            )}
            {item.sort && item.field && sort.type === SORT_TYPES.DESC && (
              <button
                type="button"
                onClick={() => handleSort(SORT_TYPES.ASC, (item.field as string))}
              >
                <ArrowUpIcon styles="h-4 w-4 inline" stroke={2} />
              </button>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default ListHeader;
