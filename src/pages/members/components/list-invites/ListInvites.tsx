/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DateTime } from 'luxon';
import { Callout } from '@components';
import { MailIcon, TrashIcon } from '@icons';
import { IMembers } from '@interfaces';
import { WARNING_TYPES } from '@libs';

export interface ListInvitesProps {
  dataList: IMembers[];
  setSelected(selected: IMembers): void;
  setSendConfirm(confirm: boolean): void;
  setDeleteConfirm(confirm: boolean): void;
}

export function ListInvites({
  dataList,
  setSelected,
  setSendConfirm,
  setDeleteConfirm,
}: ListInvitesProps) {
  return dataList.length === 0 ? (
    <Callout title="Nenhum Convite em Aberto" type={WARNING_TYPES.INFO} />
  ) : (
    <div className=" overflow-x-auto mt-4">
      <div className="bg-primary-500 text-white uppercase py-2 px-2 text-sm font-bold">
        Convites
      </div>
      <table className="w-full table">
        <tbody className="bg-white text-gray-600 text-sm">
          {dataList
            && dataList.map((data, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  {data.name}
                </td>
                <td className="py-3 px-3 text-left hidden sm:table-cell">
                  {data.email ? (
                    <a href={`mailto:${data.email}`} className="underline">
                      {data.email}
                    </a>
                  ) : (
                    <span>{data.email}</span>
                  )}
                </td>
                <td className="py-3 px-3 text-left whitespace-nowrap">
                  Enviado em
                  {' '}
                  {DateTime.fromISO(
                    data.updatedAt?.toString() as string,
                  ).toFormat('dd/MM/yy HH:mm')}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-end justify-end">
                    <div className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                      <div
                        onClick={() => {
                          setSelected(data);
                          setSendConfirm(true);
                        }}
                        className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                      >
                        <MailIcon styles="cursor-pointer" />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setSelected(data);
                        setDeleteConfirm(true);
                      }}
                      className="w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                    >
                      <TrashIcon styles="cursor-pointer" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListInvites;
