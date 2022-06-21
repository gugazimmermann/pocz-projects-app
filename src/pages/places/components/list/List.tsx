import { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListHeaderItems,
  Callout,
  ListHeader,
  AvatarList,
  ActiveBadge,
} from '@components';
import { IPlaces, IProfilesList } from '@interfaces';
import { Lang } from '@lang';
import { formatAddress, SORT_TYPES, WARNING_TYPES } from '@libs';
import { AppRoutes } from '@routes';

export interface ListProps {
  dataList: IPlaces[];
  sort: { type: SORT_TYPES; field: string };
  setSort: Dispatch<
    SetStateAction<{
      type: SORT_TYPES;
      field: string;
    }>
  >;
}

export function List({ dataList, sort, setSort }: ListProps) {
  const history = useHistory();

  const headerItems: ListHeaderItems[] = [
    { name: Lang.Places.List.HeaderItems.Name, sort: true, field: 'name' },
    { name: Lang.Places.List.HeaderItems.City },
    { name: Lang.Places.List.HeaderItems.InCharge },
    { name: Lang.Places.List.HeaderItems.Employees },
    { name: Lang.Places.List.HeaderItems.Status, align: 'center' },
  ];

  return dataList.length === 0 ? (
    <Callout title={Lang.Places.List.NoData} type={WARNING_TYPES.INFO} />
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
                onClick={() => history.push(`${AppRoutes.Places}/${data.id}`)}
              >
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  <span className="font-medium">{data.name}</span>
                </td>
                <td className="text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <span>{formatAddress(data?.city, data?.state)}</span>
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <div className="flex items-center justify-start">
                    <AvatarList
                      toShow={data.managersPlace as IProfilesList[]}
                      qtd={8}
                      smallQtd={3}
                    />
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <div className="flex items-center justify-start">
                    <AvatarList
                      toShow={data.employeesPlace as IProfilesList[]}
                      qtd={8}
                      smallQtd={3}
                    />
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <ActiveBadge status={data.active as boolean} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
