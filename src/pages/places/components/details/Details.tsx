import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AlertInterface,
  LoadingButton,
  FormatAddress,
  AvatarList,
  AvatarModal,
  ConfirmationModal,
} from '@components';
import { IPlaces, IProfilesList, IPersons } from '@interfaces';
import { Lang } from '@lang';
import { Capitalize, seePersonsType, WARNING_TYPES } from '@libs';
import { AppRoutes, CommonRoutes } from '@routes';
import { PlacesServices, MembersServices, PersonsServices } from '@services';
import {
  PERSONS_TYPE,
  MEMBERS_TYPE,
  DASHBOARD,
  isModuleInstalled,
  MODULES,
} from '@settings';

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface DetailsProps {
  loading: boolean;
  setLoading(loading: boolean): void;
  setShowAlert(showAlert: AlertInterface): void;
  data: IPlaces;
  setData(data: IPlaces): void;
  setConfirm(confirm: boolean): void;
}

export function Details({
  loading,
  setLoading,
  setShowAlert,
  data,
  setData,
  setConfirm,
}: DetailsProps) {
  const history = useHistory();
  const [confirmInative, setConfirmInative] = useState(false);

  const [membersList, setMembersList] = useState<IProfilesList[]>([]);
  const [showManagersModal, setShowManagersModal] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState<IProfilesList[]>([]);
  const [showEmployeesModal, setShowEmployeesModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<IProfilesList[]>(
    [],
  );
  const [clientsList, setClientsList] = useState<IPersons[]>([]);
  const [showClientsModal, setShowClientsModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState<IPersons[]>([]);
  const [supliersList, setSupliersList] = useState<IPersons[]>([]);
  const [showSupliersModal, setShowSupliersModal] = useState(false);
  const [selectedSupliers, setSelectedSupliers] = useState<IPersons[]>([]);
  const [contactsList, setContactsList] = useState<IPersons[]>([]);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<IPersons[]>([]);

  const handleActive = async () => {
    setLoading(true);
    try {
      const res = (await PlacesServices.active({
        active: !data.active,
        placeId: data.id as string,
      })) as IPlaces;
      setData(res);
      setLoading(false);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  };

  async function getMembersList() {
    setLoading(true);
    try {
      const res = (await MembersServices.getAll()) as IProfilesList[];
      setMembersList(res);
      setLoading(false);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  }

  async function getPersons() {
    setLoading(true);
    try {
      const clients = (await PersonsServices.getAll(
        seePersonsType(PERSONS_TYPE.CLIENTS),
      )) as IPersons[];
      setClientsList(clients);
      const supliers = (await PersonsServices.getAll(
        seePersonsType(PERSONS_TYPE.SUPLIERS),
      )) as IPersons[];
      setSupliersList(supliers);
      const contacts = (await PersonsServices.getAll(
        seePersonsType(PERSONS_TYPE.CONTACTS),
      )) as IPersons[];
      setContactsList(contacts);
      setLoading(false);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    getMembersList();
    getPersons();
  }, []);

  useEffect(() => {
    if (data.managersPlace) setSelectedManagers(data.managersPlace);
    if (data.employeesPlace) setSelectedEmployees(data.employeesPlace);
    if (data.clientsPlace) setSelectedClients(data.clientsPlace);
    if (data.supliersPlace) setSelectedSupliers(data.supliersPlace);
    if (data.contactsPlace) setSelectedContacts(data.contactsPlace);
  }, [data]);

  function handleMembers(member: IProfilesList, type: MEMBERS_TYPE) {
    if (type === MEMBERS_TYPE.MANAGER) {
      if (selectedManagers.some((u) => u.id === member.id)) {
        let managersList = selectedManagers.slice(0);
        managersList = managersList.filter((u) => u.id !== member.id);
        setSelectedManagers(managersList);
      }
    } else if (selectedEmployees.some((u) => u.id === member.id)) {
      let employeesList = selectedEmployees.slice(0);
      employeesList = employeesList.filter((u) => u.id !== member.id);
      setSelectedEmployees(employeesList);
    }
  }

  const handleSelectManagers = (manager: IProfilesList) => {
    let managersList = selectedManagers.slice(0);
    if (managersList.some((m) => m.id === manager.id)) {
      managersList = managersList.filter((m) => m.id !== manager.id);
    } else {
      managersList.push(manager);
      handleMembers(manager, MEMBERS_TYPE.MANAGER);
    }
    setSelectedManagers(managersList);
  };

  const handleSelectEmployees = (employee: IProfilesList) => {
    let employeesList = selectedEmployees.slice(0);
    if (employeesList.some((u) => u.id === employee.id)) {
      employeesList = employeesList.filter((u) => u.id !== employee.id);
    } else {
      employeesList.push(employee);
      handleMembers(employee, MEMBERS_TYPE.EMPLOYEE);
    }
    setSelectedEmployees(employeesList);
  };

  const sendMembers = async () => {
    setLoading(true);
    setShowManagersModal(false);
    setShowEmployeesModal(false);
    try {
      await PlacesServices.managers({
        placeId: data.id as string,
        managersList: selectedManagers,
      });
      const res = (await PlacesServices.employees({
        placeId: data.id as string,
        employeesList: selectedEmployees,
      })) as IPlaces;
      setData(res);
      setLoading(false);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message as string,
        type: WARNING_TYPES.ERROR,
        time: 3000,
      });
      setLoading(false);
    }
  };

  function handlePersons(person: IPersons, type: PERSONS_TYPE) {
    if (type === PERSONS_TYPE.CLIENTS) {
      if (selectedClients.some((u) => u.id === person.id)) {
        let list = selectedClients.slice(0);
        list = list.filter((u) => u.id !== person.id);
        setSelectedClients(list);
      }
    } else if (type === PERSONS_TYPE.SUPLIERS) {
      if (selectedSupliers.some((u) => u.id === person.id)) {
        let list = selectedSupliers.slice(0);
        list = list.filter((u) => u.id !== person.id);
        setSelectedClients(list);
      }
    } else if (type === PERSONS_TYPE.CONTACTS) {
      if (selectedContacts.some((u) => u.id === person.id)) {
        let list = selectedContacts.slice(0);
        list = list.filter((u) => u.id !== person.id);
        setSelectedClients(list);
      }
    }
  }

  const handleSelectClients = (client: IPersons) => {
    let list = selectedClients.slice(0);
    if (list.some((u) => u.id === client.id)) {
      list = list.filter((u) => u.id !== client.id);
    } else {
      list.push(client);
      handlePersons(client, PERSONS_TYPE.CLIENTS);
    }
    setSelectedClients(list);
  };

  const handleSelectSupliers = (suplier: IPersons) => {
    let list = selectedSupliers.slice(0);
    if (list.some((u) => u.id === suplier.id)) {
      list = list.filter((u) => u.id !== suplier.id);
    } else {
      list.push(suplier);
      handlePersons(suplier, PERSONS_TYPE.SUPLIERS);
    }
    setSelectedSupliers(list);
  };

  const handleSelectContacts = (contact: IPersons) => {
    let list = selectedClients.slice(0);
    if (list.some((u) => u.id === contact.id)) {
      list = list.filter((u) => u.id !== contact.id);
    } else {
      list.push(contact);
      handlePersons(contact, PERSONS_TYPE.CONTACTS);
    }
    setSelectedClients(list);
  };

  const cancelMembersOrPersonsModal = () => {
    setSelectedManagers(data.managersPlace as IProfilesList[]);
    setSelectedEmployees(data.employeesPlace as IProfilesList[]);
    setSelectedClients(data.clientsPlace as IPersons[]);
    setSelectedSupliers(data.supliersPlace as IPersons[]);
    setSelectedContacts(data.contactsPlace as IPersons[]);
    setShowManagersModal(false);
    setShowEmployeesModal(false);
    setShowClientsModal(false);
    setShowSupliersModal(false);
    setShowContactsModal(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between py-2">
        <div className="flex space-x-2 justify-center md:justify-start mb-4 md:mb-0">
          <button
            type="button"
            onClick={() => history.push(`${AppRoutes.DashboardsPlaces}/${data?.id}`)}
            className="px-2 py-1 text-xs text-white rounded-md bg-primary-500 hover:bg-primary-900 focus:ring-primary-500"
          >
            {DASHBOARD.SINGLE}
          </button>
          {isModuleInstalled(MODULES.FINANCIAL) && (
            <button
              type="button"
              onClick={() => history.push(`${AppRoutes.Places}/${data?.id}`)}
              className="px-2 py-1 text-xs text-white rounded-md bg-green-500 hover:bg-green-900 focus:ring-green-500"
            >
              {Lang.Places.Details.Finances}
            </button>
          )}
        </div>
        <div className="flex space-x-2  justify-center md:justify-end">
          <button
            type="button"
            onClick={() => history.push(
              `${AppRoutes.Places}${CommonRoutes.UPDATE}${data?.id}`,
            )}
            className="px-2 py-1 text-xs text-white rounded-md bg-yellow-500 hover:bg-yellow-900 focus:ring-yellow-500"
          >
            {Lang.Places.Details.Edit}
          </button>
          <LoadingButton
            styles={`px-2 py-1 text-xs text-white rounded-md ${
              data.active
                ? 'bg-gray-500 hover:bg-gray-800 focus:ring-gray-500'
                : 'bg-green-500 hover:bg-green-800 focus:ring-green-500'
            } `}
            loadingStyles="h-4 w-4"
            type="button"
            text={
              data.active
                ? `${Lang.Places.Details.Make} ${Lang.Places.Details.Inactive}`
                : `${Lang.Places.Details.Make} ${Lang.Places.Details.Active}`
            }
            loading={loading}
            action={() => setConfirmInative(true)}
          />
          <LoadingButton
            styles="px-2 py-1 text-xs text-white rounded-md bg-red-500 hover:bg-red-900 focus:ring-red-500"
            loadingStyles="h-4 w-4"
            type="button"
            text={Lang.Places.Details.Remove}
            loading={loading}
            action={() => setConfirm(true)}
          />
        </div>
      </div>
      <div className="bg-white shadow-sm rounded">
        <div className="mb-6 grid grid-cols-12 items-center justify-center">
          <div className="col-span-full flex flex-col md:flex-row w-full items-center justify-start py-4 md:p-4 border-b">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">
                  {data.name}
                  {!data.active && ` | ${Lang.Places.Details.Inactive}`}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Lang.Places.Details.Phone}
              </p>
              <p className="col-span-9">{data.phone}</p>
            </div>
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Lang.Places.Details.Email}
              </p>
              <p className="col-span-9">
                {data.email ? (
                  <a href={`mailto:${data.email}`} className="underline">
                    {data.email}
                  </a>
                ) : (
                  <span>{data.email}</span>
                )}
              </p>
            </div>
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Lang.Places.Details.Address}
              </p>
              <FormatAddress
                address={data.address}
                number={data.number}
                complement={data.complement}
                neighborhood={data.neighborhood}
                city={data.city}
                state={data.state}
                zip={data.zip}
              />
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Lang.Places.Details.InCharge}
              </p>
              <div className="col-span-9 flex justify-between">
                <AvatarList toShow={selectedManagers} qtd={8} smallQtd={5} />
                <button
                  type="button"
                  onClick={() => setShowManagersModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? 'text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
                      : 'text-white bg-gray-500'
                  }`}
                  disabled={!data.active}
                >
                  {Lang.Places.Details.Add}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Lang.Places.Details.Employees}
              </p>
              <div className="col-span-9 flex justify-between">
                <AvatarList toShow={selectedEmployees} qtd={8} smallQtd={5} />
                <button
                  type="button"
                  onClick={() => setShowEmployeesModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? 'text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
                      : 'text-white bg-gray-500'
                  }`}
                  disabled={!data.active}
                >
                  {Lang.Places.Details.Add}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Capitalize(Lang.Places.Details.Clients)}
              </p>
              <div className="col-span-9 flex justify-between">
                <AvatarList toShow={selectedClients} qtd={8} smallQtd={5} />
                <button
                  type="button"
                  onClick={() => setShowClientsModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? 'text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
                      : 'text-white bg-gray-500'
                  }`}
                  disabled={!data.active}
                >
                  {Lang.Places.Details.Add}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Capitalize(Lang.Places.Details.Supliers)}
              </p>
              <div className="col-span-9 flex justify-between">
                <AvatarList toShow={selectedSupliers} qtd={8} smallQtd={5} />
                <button
                  type="button"
                  onClick={() => setShowSupliersModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? 'text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
                      : 'text-white bg-gray-500'
                  }`}
                  disabled={!data.active}
                >
                  {Lang.Places.Details.Add}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Capitalize(Lang.Places.Details.Contacts)}
              </p>
              <div className="col-span-9 flex justify-between">
                <AvatarList toShow={selectedContacts} qtd={8} smallQtd={5} />
                <button
                  type="button"
                  onClick={() => setShowContactsModal(true)}
                  className={`p-2 py-1 text-xs rounded-md ${
                    data.active
                      ? 'text-white bg-primary-500 hover:bg-primary-900 focus:ring-primary-500'
                      : 'text-white bg-gray-500'
                  }`}
                  disabled={!data.active}
                >
                  {Lang.Places.Details.Add}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <div className="md:grid md:grid-cols-12 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="col-span-3 font-bold">
                {Lang.Places.Details.Events}
              </p>
              <p className="col-span-9" />
            </div>
          </div>
        </div>
      </div>
      {showManagersModal && (
        <AvatarModal
          title={Lang.Places.Details.OwnersModal.Title}
          membersList={membersList}
          currentList={selectedManagers}
          handleSelect={handleSelectManagers}
          cancel={cancelMembersOrPersonsModal}
          submit={sendMembers}
          submitText={Lang.Places.Details.OwnersModal.SubmitText}
          open={showManagersModal}
          setOpen={setShowManagersModal}
        />
      )}
      {showEmployeesModal && (
        <AvatarModal
          title={Lang.Places.Details.EmployeesModal.Title}
          membersList={membersList}
          currentList={selectedEmployees}
          handleSelect={handleSelectEmployees}
          cancel={cancelMembersOrPersonsModal}
          submit={sendMembers}
          submitText={Lang.Places.Details.EmployeesModal.SubmitText}
          open={showEmployeesModal}
          setOpen={setShowEmployeesModal}
        />
      )}
      {showClientsModal && (
        <AvatarModal
          title={Lang.Places.Details.ClientsModal.Title}
          membersList={clientsList}
          currentList={selectedClients}
          handleSelect={handleSelectClients}
          cancel={cancelMembersOrPersonsModal}
          submit={sendMembers}
          submitText={Lang.Places.Details.ClientsModal.SubmitText}
          open={showClientsModal}
          setOpen={setShowClientsModal}
        />
      )}
      {showSupliersModal && (
        <AvatarModal
          title={Lang.Places.Details.SupliersModal.Title}
          membersList={supliersList}
          currentList={selectedSupliers}
          handleSelect={handleSelectSupliers}
          cancel={cancelMembersOrPersonsModal}
          submit={sendMembers}
          submitText={Lang.Places.Details.SupliersModal.SubmitText}
          open={showSupliersModal}
          setOpen={setShowSupliersModal}
        />
      )}
      {showClientsModal && (
        <AvatarModal
          title={Lang.Places.Details.ClientsModal.Title}
          membersList={contactsList}
          currentList={selectedContacts}
          handleSelect={handleSelectContacts}
          cancel={cancelMembersOrPersonsModal}
          submit={sendMembers}
          submitText={Lang.Places.Details.ClientsModal.SubmitText}
          open={showContactsModal}
          setOpen={setShowContactsModal}
        />
      )}
      {confirmInative && (
        <ConfirmationModal
          setConfirm={setConfirmInative}
          type={WARNING_TYPES.WARNING}
          title={`${Lang.Places.Details.Make} ${data.name} ${
            data.active
              ? Lang.Places.Details.Inactive
              : Lang.Places.Details.Active
          }?`}
          content={`${Lang.Places.Details.ConfirmationQuestion} ${data.name} ${
            data.active
              ? Lang.Places.Details.Inactive
              : Lang.Places.Details.Active
          }?`}
          buttonText={`${Lang.Places.Details.ConfirmationButton} ${
            data.active
              ? Lang.Places.Details.Inactive
              : Lang.Places.Details.Active
          }`}
          action={handleActive}
        />
      )}
    </>
  );
}

export default Details;
