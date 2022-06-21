import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  AlertInterface,
  FilterField,
  AddButton,
  Alert,
  ConfirmationModal,
  Header,
} from '@components';
import {
  IProfiles,
  IPlaces,
  IPersonsTypes,
  IPersons,
  IProfilesList,
  ICompanies,
} from '@interfaces';
import {
  WARNING_TYPES, SORT_TYPES, Sort, seePersonsType, Capitalize,
} from '@libs';
import { AppRoutes, CommonRoutes } from '@routes';
import {
  CompaniesServices,
  MembersServices,
  PersonsServices,
  PlacesServices,
} from '@services';
import { List, Details, Form } from './components';

interface PersonsProps {
  profile?: IProfiles;
}

export function Persons({ profile }: PersonsProps) {
  const history = useHistory();
  const { pathname } = useLocation();
  let { id } = useParams<{ id: string }>();
  const { type } = useParams<{ type: IPersonsTypes }>();

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
  const [dataList, setDataList] = useState([] as IPersons[]);
  const [showDataList, setShowDataList] = useState([] as IPersons[]);
  const [selected, setSelected] = useState({} as IPersons);
  const [confirm, setConfirm] = useState(false);
  const [searchParam, setSearchParam] = useState<string>();
  const [sort, setSort] = useState<{ type: SORT_TYPES; field: string }>({
    type: SORT_TYPES.ASC,
    field: 'name',
  });

  const [selectedOwner, setSelectedOwner] = useState<string>('All');
  const [members, setMembers] = useState<IProfilesList[]>([]);
  const [places, setPlaces] = useState<IPlaces[]>([]);
  const [companies, setCompanies] = useState<ICompanies[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function getSelected(id: string) {
    setLoading(true);
    try {
      const data = (await PersonsServices.getOne({ id })) as IPlaces;
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
      history.push(`${AppRoutes.Places}/${type}/${CommonRoutes.LIST}`);
    }
  }

  function filterOnwer(data: IPersons[], owner: string) {
    let res: IPersons[] = [];
    if (owner === 'All') {
      res = data;
    } else {
      res = data.filter((d) => d.onwers?.some((o) => o.id === owner));
    }
    return res;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function getDataList(selectedOwner: string) {
    setLoading(true);
    const personsType = seePersonsType(type);
    try {
      const personsData = (await PersonsServices.getAll(
        personsType,
      )) as IPersons[];
      const data = filterOnwer(personsData, selectedOwner);
      setDataList(data);
      const sortedData = Sort(data.slice(0), {
        sort: sort.type,
        field: sort.field,
      });
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
      getDataList(selectedOwner);
      setWhatToShow('list');
    }
  }, [id, pathname]);

  const reloadList = async () => {
    await getDataList(selectedOwner);
    setWhatToShow('list');
  };

  async function getMembers() {
    try {
      const membersData = (await MembersServices.getAll()) as IProfilesList[];
      if (membersData.length) setMembers(membersData);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  async function getPlaces() {
    try {
      const placesData = (await PlacesServices.getAll()) as IPlaces[];
      const placesFilter = placesData.filter((p) => p.active);
      if (placesFilter.length) setPlaces(placesFilter);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  async function getCompanies() {
    try {
      const companiesData = (await CompaniesServices.getAll()) as ICompanies[];
      if (companiesData.length) setCompanies(companiesData);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
    }
  }

  useEffect(() => {
    getMembers();
    getPlaces();
    getCompanies();
  }, []);

  const handleCreate = async (data: FormData) => {
    setLoading(true);
    try {
      const newPerson = (await PersonsServices.createPerson({
        formData: data,
      })) as IPersons;
      await getDataList(selectedOwner);
      setShowAlert({
        show: true,
        message: 'cadastrado com sucesso.',
        type: WARNING_TYPES.SUCCESS,
        time: 3000,
      });
      id = newPerson.id as string;
      history.push(`${AppRoutes.Persons}/${type}/${newPerson.id}`);
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

  const handleUpate = async (data: FormData) => {
    setLoading(true);
    try {
      await PersonsServices.updatePerson({ formData: data });
      setShowAlert({
        show: true,
        message: 'alterado com sucesso.',
        type: WARNING_TYPES.INFO,
        time: 3000,
      });
      reloadList();
      history.push(`${AppRoutes.Persons}/${type}${CommonRoutes.LIST}}`);
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
    if (selected?.id) {
      setLoading(true);
      try {
        await PersonsServices.deleteOnePerson({ id: selected.id });
        setShowAlert({
          show: true,
          message: ' removido com sucesso.',
          type: WARNING_TYPES.WARNING,
          time: 3000,
        });
        reloadList();
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
      backRoute={`${AppRoutes.Persons}/${type}${CommonRoutes.LIST}`}
      addRoute={`${AppRoutes.Persons}/${type}${CommonRoutes.CREATE}`}
      reload={reloadList}
      isProfessional={profile?.isProfessional && profile.isAdmin}
    />
  );

  const createSelect = () => (
    <select
      defaultValue={selectedOwner}
      className="rounded-md text-sm focus:ring-0 focus:ring-opacity-75 text-gray-900 focus:ring-primary-500 border-gray-300"
      onChange={(e) => setSelectedOwner(e.target.value)}
    >
      <option value="All">Todos</option>
      {members
        && members.map((m, i) => (
          <option key={i} value={m.id}>
            {m.name}
          </option>
        ))}
      {places
        && places.map((o, i) => (
          <option key={i} value={o.id}>
            {o.name}
          </option>
        ))}
    </select>
  );

  return (
    <div className="container mx-auto">
      <Header
        before={[]}
        main={Capitalize(type)}
        select={whatToShow === 'list' ? createSelect : undefined}
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
            <List
              type={type}
              dataList={showDataList}
              sort={sort}
              setSort={setSort}
            />
          )}
          {whatToShow === 'details' && (
            <Details
              type={type}
              loading={loading}
              setLoading={setLoading}
              setShowAlert={setShowAlert}
              data={selected}
              setData={setSelected}
              setConfirm={setConfirm}
              places={places}
              members={members}
            />
          )}
          {whatToShow === 'create' && (
            <Form
              loading={loading}
              type={type}
              companies={companies}
              create={handleCreate}
            />
          )}
          {whatToShow === 'update' && (
            <Form
              loading={loading}
              type={type}
              data={selected}
              companies={companies}
              update={handleUpate}
            />
          )}
          {confirm && (
            <ConfirmationModal
              setConfirm={setConfirm}
              type={WARNING_TYPES.ERROR}
              title={`Excluir : ${selected?.name}?`}
              content={`Você tem certeza que quer excluir o ${selected?.name}? Todos os dados desse serão perdidos. Essa ação não poderá ser desfeita.`}
              action={handleDelete}
            />
          )}
          {/* {!profile?.isProfessional && (
            <BasicPlanMsg message={Lang.Places.BasicPlan} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Persons;
