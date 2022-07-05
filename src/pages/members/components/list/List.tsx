/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListHeaderItems,
  Callout,
  ListHeader,
  ActiveBadge,
  AvatarOrInitial,
  RoleBadge,
} from '@components';
import { IMembersSimple } from '@interfaces';
import { Lang } from '@lang';
import { SORT_TYPES, WARNING_TYPES } from '@libs';
import { AppRoutes } from '@routes';

export interface ListProps {
  dataList: IMembersSimple[];
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
    { name: '' },
    { name: Lang.Members.List.HeaderItems.Name, sort: true, field: 'name' },
    { name: Lang.Members.List.HeaderItems.Phone },
    { name: Lang.Members.List.HeaderItems.Email },
    {
      name: Lang.Members.List.HeaderItems.Type, align: 'center', sort: true, field: 'role',
    },
    {
      name: Lang.Members.List.HeaderItems.Status, align: 'center', sort: true, field: 'active',
    },
  ];

  return dataList.length === 0 ? (
    <Callout title={Lang.Members.List.NoData} type={WARNING_TYPES.INFO} />
  ) : (
    <div className=" overflow-x-auto">
      <table className="w-full table">
        <ListHeader items={headerItems} sort={sort} setSort={setSort} />
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList
            && dataList.map((data, i) => (
              <tr
                key={i}
                className="border-b border-gray-200"
                // className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                // onClick={() => history.push(`${AppRoutes.Members}/${data.id}`)}
              >
                <td className="py-3 px-3 text-left">
                  <AvatarOrInitial
                    avatar={data.avatar}
                    name={data.name}
                    avatarStyle="w-6 h-6"
                    initialStyle="w-6 h-6"
                  />
                </td>
                <td className="text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <span>{data.name}</span>
                  </div>
                </td>
                <td className="text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <span>{data.phone}</span>
                  </div>
                </td>
                <td className="text-left hidden sm:table-cell">
                  <div className="flex items-center">
                    <span className="font-bold">{data.email}</span>
                  </div>
                </td>
                <td className="text-center hidden sm:table-cell">
                  <RoleBadge role={data.role as string} />
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
