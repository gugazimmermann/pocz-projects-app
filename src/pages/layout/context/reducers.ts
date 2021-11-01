type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key, payload: M[Key] }
};

export type StateType = { activeMenu: string };

type MenuActionsType = { ['UPDATE_MENU']: string };

export type MenuActions = ActionMap<MenuActionsType>[keyof ActionMap<MenuActionsType>];

function changeActiveMenu(payload: string) {
  return { activeMenu: payload };
}

export const MenuReducer = (state: StateType, { type, payload }: MenuActions): StateType => {
  switch (type) {
    case 'UPDATE_MENU':
      return changeActiveMenu(payload as string);
    default:
      throw new Error('TYPE NOT FOUND');
  }
};
