import { MODULES } from '.';

const basicModules: Array<MODULES> = [
  MODULES.AUTH,
  MODULES.SUBSCRIPTIONS,
  MODULES.PROFILE,
  MODULES.PLACES,
  MODULES.MEMBERS,
  MODULES.PERSONS,
];

const installedModules: Array<MODULES> = [];

export function isModuleInstalled(module: MODULES): boolean {
  if ((basicModules.concat(installedModules)).includes(module)) return true;
  return false;
}
