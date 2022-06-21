import {
  DashboardIcon, PlacesIcon, MembersIcon, PersonsIcon,
} from '@icons';
import { MenuItemInterface } from '@interfaces';
import { Capitalize, toURL } from '@libs';
import { AppRoutes } from '@routes';
import {
  DASHBOARD, PLACES, PROCESSES, MEMBERS, PERSONS, PERSONS_TYPE,
} from '../../../../../settings';

export const menu: MenuItemInterface[] = [
  {
    name: DASHBOARD.PLURAL,
    route: AppRoutes.Dashboards,
    icon: <DashboardIcon styles="w-6 h-6" stroke={2} />,
    subItems: [
      {
        name: PLACES.PLURAL,
        link: AppRoutes.DashboardsPlaces,
      },
      {
        name: PROCESSES.PLURAL,
        link: AppRoutes.DashboardsProcesses,
      },
    ],
  },
  {
    name: PLACES.PLURAL,
    route: AppRoutes.Places,
    icon: <PlacesIcon styles="w-6 h-6" stroke={2} />,
    subItems: [
      {
        name: PLACES.PLURAL,
        link: AppRoutes.Places,
      },
    ],
  },
  {
    name: MEMBERS.PLURAL,
    route: AppRoutes.Members,
    icon: <MembersIcon styles="w-6 h-6" stroke={2} />,
    subItems: [
      {
        name: MEMBERS.PLURAL,
        link: AppRoutes.Members,
      },
    ],
  },
  {
    name: PERSONS.PLURAL,
    route: AppRoutes.Persons,
    icon: <PersonsIcon styles="w-6 h-6" stroke={2} />,
    subItems: [
      {
        name: Capitalize(PERSONS_TYPE.CLIENTS),
        link: `${AppRoutes.Persons}/${toURL(PERSONS_TYPE.CLIENTS)}`,
      },
      {
        name: Capitalize(PERSONS_TYPE.SUPLIERS),
        link: `${AppRoutes.Persons}/${toURL(PERSONS_TYPE.SUPLIERS)}`,
      },
      {
        name: Capitalize(PERSONS_TYPE.CONTACTS),
        link: `${AppRoutes.Persons}/${toURL(PERSONS_TYPE.CONTACTS)}`,
      },
    ],
  },
];

// case 'MembersIcon': {
// return <MembersIcon styles="w-6 h-6" stroke={2} />;
// }
// case 'BusinessContactsIcon': {
// return <BusinessContactsIcon styles="w-6 h-6" stroke={2} />;
// }
// case 'ScheduleIcon': {
// return <ScheduleIcon styles="w-6 h-6" stroke={2} />;
// }
// case 'FinancialIcon': {
// return <FinancialIcon styles="w-6 h-6" stroke={2} />;
// }
