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
import { IProfiles, IPlaces } from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES, SORT_TYPES, Sort } from '@libs';
import { AppRoutes, CommonRoutes } from '@routes';
import { PlacesServices } from '@services';
import { PLACES } from '@settings';
import { List, Details, Form } from './components';

interface PlacesProps {
  profile?: IProfiles;
  setPlaces?(countPlaces: number): void;
}

export function Places({ profile, setPlaces }: PlacesProps) {
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
  const [dataList, setDataList] = useState([] as IPlaces[]);
  const [showDataList, setShowDataList] = useState([] as IPlaces[]);
  const [selected, setSelected] = useState({} as IPlaces);
  const [confirm, setConfirm] = useState(false);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<{ type: SORT_TYPES; field: string }>({
    type: SORT_TYPES.ASC,
    field: 'name',
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function getSelected(id: string) {
    setLoading(true);
    try {
      const data = (await PlacesServices.getOne({ id })) as IPlaces;
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
      history.push(`${AppRoutes.Places}${CommonRoutes.LIST}`);
    }
  }

  async function getDataList() {
    setLoading(true);
    try {
      let data = (await PlacesServices.getAll()) as IPlaces[];
      if (setPlaces) setPlaces(data.length);
      if (!profile?.isAdmin) data = data.filter((d) => d.active);
      setDataList(data);
      const sortedData = Sort(data.slice(0), { sort: sort.type, field: sort.field });
      setShowDataList(sortedData);
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

  const handleCreate = async (data: IPlaces) => {
    setLoading(true);
    try {
      const newPlace = (await PlacesServices.create({
        formData: data,
      })) as IPlaces;
      setShowAlert({
        show: true,
        message: Lang.Places.List.Add,
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      await getDataList();
      id = newPlace.id as string;
      history.push(`${AppRoutes.Places}/${newPlace.id}`);
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

  const handleUpate = async (data: IPlaces) => {
    setLoading(true);
    try {
      await PlacesServices.update({ formData: data });
      setShowAlert({
        show: true,
        message: Lang.Places.Updated,
        type: WARNING_TYPES.WARNING,
        time: 3000,
      });
      reloadList();
      history.push(`${AppRoutes.Places}${CommonRoutes.LIST}`);
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

  const handleDelete = async () => {
    if (selected.id) {
      setLoading(true);
      try {
        await PlacesServices.deleteOne({ id: selected.id });
        setShowAlert({
          show: true,
          message: Lang.Places.Deleted,
          type: WARNING_TYPES.ERROR,
          time: 3000,
        });
        reloadList();
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setShowAlert({
          ...showAlert,
          show: true,
          message: err.message as string,
          type: WARNING_TYPES.ERROR,
        });
      }
    }
  };

  useEffect(() => {
    const sortedData = Sort(dataList.slice(0), { sort: sort.type, field: sort.field });
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
      backRoute={`${AppRoutes.Places}${CommonRoutes.LIST}`}
      addRoute={`${AppRoutes.Places}${CommonRoutes.CREATE}`}
      reload={reloadList}
      isProfessional={profile?.isProfessional && profile.isAdmin}
    />
  );

  const seeConfirmDeleteContent = (name: string): string => {
    const langText = Lang.Places.ConfirmDeleteContent.split('*');
    return `${langText[0]}${name}${langText[1]}`;
  };

  return (
    <div className="container mx-auto">
      <Header
        before={[]}
        main={PLACES.PLURAL}
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
            <List dataList={showDataList} sort={sort} setSort={setSort} />
          )}
          {whatToShow === 'details' && (
            <Details
              loading={loading}
              setLoading={setLoading}
              setShowAlert={setShowAlert}
              data={selected}
              setData={setSelected}
              setConfirm={setConfirm}
            />
          )}
          {whatToShow === 'create' && (
            <Form loading={loading} create={handleCreate} />
          )}
          {whatToShow === 'update' && (
            <Form loading={loading} data={selected} update={handleUpate} />
          )}
          {confirm && (
            <ConfirmationModal
              setConfirm={setConfirm}
              type={WARNING_TYPES.ERROR}
              title={`${Lang.Places.ConfirmDelete} ${selected.name}?`}
              content={seeConfirmDeleteContent(selected.name)}
              action={handleDelete}
            />
          )}
          {!profile?.isProfessional && (
            <BasicPlanMsg message={Lang.Places.BasicPlan} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Places;
