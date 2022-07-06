/* eslint-disable prefer-const */
import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  AlertInterface,
  FilterField,
  AddButton,
  Alert,
  ConfirmationModal,
  BasicPlanMsg,
  Header,
} from '@components';
import {
  IProfiles, IPlaces, IMembersSimple, IMembers,
} from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES, SORT_TYPES, Sort } from '@libs';
import { AppRoutes, CommonRoutes } from '@routes';
import { MembersServices } from '@services';
import { MEMBERS } from '@settings';
import { Form, List, ListInvites } from './components';

interface MembersProps {
  profile?: IProfiles;
}

export function Members({ profile }: MembersProps) {
  const history = useHistory();
  const { pathname } = useLocation();
  let { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [whatToShow, setWhatToShow] = useState<
    'list' | 'details' | 'update' | 'create'
  >();
  const [dataList, setDataList] = useState([] as IMembersSimple[]);
  const [showDataList, setShowDataList] = useState([] as IMembersSimple[]);
  const [, setSelected] = useState({} as IPlaces);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<{ type: SORT_TYPES; field: string }>({
    type: SORT_TYPES.ASC,
    field: 'name',
  });

  const [dataListInvite, setDataListInvite] = useState([] as IMembers[]);
  const [selectedInvite, setSelectedInvite] = useState({} as IMembers);
  const [sendInviteConfirm, setSendInviteConfirm] = useState(false);
  const [deleteInviteConfirm, setDeleteInviteConfirm] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function getSelected(id: string) {
    setLoading(true);
    try {
      const data = (await MembersServices.getOne({ id })) as IPlaces;
      setSelected(data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      history.push(`${AppRoutes.Members}${CommonRoutes.LIST}`);
    }
  }

  async function getDataList() {
    setLoading(true);
    try {
      let data = (await MembersServices.getAll()) as IMembersSimple[];
      setDataList(data);
      const sortedData = Sort(data.slice(0), {
        sort: sort.type,
        field: sort.field,
      });
      setShowDataList(sortedData);
      const dataInvites = (await MembersServices.getInvites()) as IMembers[];
      setDataListInvite(dataInvites);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  useEffect(() => {
    if (pathname.includes(CommonRoutes.CREATE)) {
      setWhatToShow('create');
    } else if (pathname.includes(CommonRoutes.UPDATE)) {
      getSelected(id);
      setWhatToShow('update');
    } else if (id) {
      getSelected(id);
      setWhatToShow('details');
    } else {
      getDataList();
      setWhatToShow('list');
    }
  }, [id, pathname]);

  const reloadList = async () => {
    await getDataList();
    setWhatToShow('list');
  };

  const handleCreateInvite = async (data: { name: string; email: string }) => {
    setLoading(true);
    try {
      (await MembersServices.createInvite({ formData: data })) as IMembers;
      setShowAlert({
        show: true,
        message: Lang.Members.List.Add,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      history.push(`${AppRoutes.Members}${CommonRoutes.LIST}`);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  };

  const handleInviteReSend = async () => {
    setLoading(true);
    try {
      await MembersServices.sendInvite({ id: selectedInvite.id as string });
      await getDataList();
      setShowAlert({
        show: true,
        message: Lang.Members.InviteSend.Alert,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  };

  const handleDeleteInvite = async () => {
    if (selectedInvite.id) {
      setLoading(true);
      try {
        await MembersServices.deleteInvite({ id: selectedInvite.id });
        setShowAlert({
          show: true,
          message: Lang.Members.InviteDelete.Alert,
          type: WARNING_TYPES.SUCCESS,
          time: 3000,
        });
        reloadList();
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
      }
    }
  };

  useEffect(() => {
    const sortedData = Sort(dataList.slice(0), {
      sort: sort.type,
      field: sort.field,
    });
    setShowDataList(sortedData);
  }, [sort]);

  useEffect(() => {
    const data = dataList.length ? dataList.slice(0) : [];
    if (searchParam) {
      const res = data.filter((d) => (d.name as string)
        .toLocaleLowerCase()
        .includes(searchParam.toLocaleLowerCase()));
      setShowDataList(res);
    } else {
      setShowDataList(data);
    }
  }, [searchParam]);

  const createFilter = () => <FilterField setSearchParam={setSearchParam} />;

  const createButton = () => (
    <AddButton
      back={whatToShow !== 'list'}
      backRoute={`${AppRoutes.Members}${CommonRoutes.LIST}`}
      addRoute={`${AppRoutes.Members}${CommonRoutes.CREATE}`}
      reload={reloadList}
      disabled={
        !profile?.isAdmin
        || (!profile?.isProfessional
          && (showDataList.length > 1 || dataListInvite.length >= 1))
      }
    />
  );

  // TODO: edit members permissions
  return (
    <div className="container mx-auto">
      <Header
        before={[]}
        main={MEMBERS.PLURAL}
        search={whatToShow === 'list' ? createFilter : undefined}
        button={createButton}
        back={whatToShow !== 'list'}
      />
      <div className="flex items-center justify-center overflow-hidden p-2">
        <div className="w-full">
          {showAlert.show && (
            <Alert alert={showAlert} setAlert={setShowAlert} />
          )}
          {whatToShow === 'list' && (
            <>
              <List dataList={showDataList} sort={sort} setSort={setSort} />
              <ListInvites
                dataList={dataListInvite}
                setSelected={setSelectedInvite}
                setSendConfirm={setSendInviteConfirm}
                setDeleteConfirm={setDeleteInviteConfirm}
              />
            </>
          )}
          {whatToShow === 'create' && (
            <Form loading={loading} create={handleCreateInvite} />
          )}
          {sendInviteConfirm && (
            <ConfirmationModal
              setConfirm={setSendInviteConfirm}
              type={WARNING_TYPES.INFO}
              title={`${Lang.Members.InviteSend.Title}${selectedInvite.email}?`}
              content={`${Lang.Members.InviteSend.Content}${selectedInvite.name}?`}
              buttonText={Lang.Members.InviteSend.Button}
              action={handleInviteReSend}
            />
          )}
          {deleteInviteConfirm && (
            <ConfirmationModal
              setConfirm={setDeleteInviteConfirm}
              type={WARNING_TYPES.ERROR}
              title={`${Lang.Members.InviteDelete.Title}${selectedInvite.email}?`}
              content={`${Lang.Members.InviteDelete.Title}${selectedInvite.name}?`}
              buttonText={Lang.Members.InviteDelete.Button}
              action={handleDeleteInvite}
            />
          )}
          {!profile?.isProfessional
            && profile?.isAdmin
            && (showDataList.length > 1 || dataListInvite.length >= 1) && (
              <BasicPlanMsg
                message={Lang.Members.BasicPlan}
                isAdmin={!!profile?.isAdmin}
              />
          )}
        </div>
      </div>
    </div>
  );
}

export default Members;
