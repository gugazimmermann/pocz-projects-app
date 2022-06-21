import { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListHeaderItems,
  Callout,
  ListHeader,
  AvatarOrInitial,
} from '@components';
import { IPersons, IPersonsTypes } from '@interfaces';
import { Lang } from '@lang';
import {
  SORT_TYPES, WARNING_TYPES, formatAddress, formatText,
} from '@libs';
import { AppRoutes } from '@routes';

export interface ListProps {
  type: IPersonsTypes;
  dataList: IPersons[];
  sort: { type: SORT_TYPES; field: string };
  setSort: Dispatch<
    SetStateAction<{
      type: SORT_TYPES;
      field: string;
    }>
  >;
}

export function List({
  type, dataList, sort, setSort,
}: ListProps) {
  const history = useHistory();

  const headerItems: ListHeaderItems[] = [
    { name: '' },
    { name: Lang.Persons.List.HeaderItems.Name, sort: true, field: 'name' },
    { name: Lang.Persons.List.HeaderItems.Phone },
    { name: Lang.Persons.List.HeaderItems.Email },
    { name: Lang.Persons.List.HeaderItems.CityState },
  ];

  return dataList.length === 0 ? (
    <Callout
      title={formatText(
        Lang.Persons.List.NoData,
        [Lang.Persons.Types[type].single],
      )}
      type={WARNING_TYPES.INFO}
    />
  ) : (
    <div className=" overflow-x-auto">
      <table className="w-full table">
        <ListHeader items={headerItems} sort={sort} setSort={setSort} />
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList
            && dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => history.push(`${AppRoutes.Persons}/${type}/${data.id}`)}
              >
                <td className="py-3 px-3">
                  <AvatarOrInitial
                    avatar={data.avatar}
                    name={data.name}
                    avatarStyle="w-6 h-6"
                    initialStyle="w-6 h-6"
                  />
                </td>
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span className="font-medium">{data.name}</span>
                </td>
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span className="font-medium">{data.phone}</span>
                </td>
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  {data.email ? (
                    <a href={`mailto:${data.email}`} className="underline">
                      {data.email}
                    </a>
                  ) : (
                    <span>{data.email}</span>
                  )}
                </td>
                <td className="py-3 px-3 text-left">
                  <span>{formatAddress(data?.city, data?.state)}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
