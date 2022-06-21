import { Lang } from '@lang';
import { toURL } from '@libs';
import {
  COMPANIES,
  DASHBOARD,
  MEMBERS,
  PERSONS,
  PLACES,
  PROCESSES,
  PROFILE,
  SUBSCRIPTIONS,
} from '@settings';

export const SiteRoutes = {
  Terms: `/${toURL(Lang.Auth.Terms)}`,
  Privacity: `/${toURL(Lang.Auth.Privacity)}`,
};

export const AuthRoutes = {
  SignIn: `/${Lang.Auth.SignIn.Route}`,
  ForgotPassword: `/${Lang.Auth.ForgotPassword.Route}`,
  ChangePassword: `/${Lang.Auth.ChangePassword.Route}`,
  SignUp: `/${Lang.Auth.SignUp.Route}`,
  Plans: `/${Lang.Auth.Plans.Route}`,
  Subscription: `/${Lang.Auth.Subscription.Route}`,
};

export const CommonRoutes = {
  LIST: '',
  CREATE: `/${Lang.ModuleRoutes.Create}`,
  UPDATE: `/${Lang.ModuleRoutes.Update}/`,
  DETAILS: '/',
};

export const AppRoutes = {
  Dashboards: `/${toURL(DASHBOARD.PLURAL)}`,
  DashboardsPlaces: `/${toURL(DASHBOARD.PLURAL)}/${toURL(PLACES.PLURAL)}`,
  DashboardsProcesses: `/${toURL(DASHBOARD.PLURAL)}/${toURL(PROCESSES.PLURAL)}`,
  Profile: `/${toURL(PROFILE.SINGLE)}`,
  Subscriptions: `/${toURL(SUBSCRIPTIONS.SINGLE)}`,
  Places: `/${toURL(PLACES.PLURAL)}`,
  Members: `/${toURL(MEMBERS.PLURAL)}`,
  Persons: `/${toURL(PERSONS.PLURAL)}`,
  Companies: `/${toURL(COMPANIES.PLURAL)}`,
};
