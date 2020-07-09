import { createAction, props, Action } from '@ngrx/store';
import { SCREENTYPES } from './iheader.state';

export interface IButtonAction {
  screenType: SCREENTYPES;
  isUserLoggedIn?: boolean;
}

export class HeaderMenuActions {
  static readonly LOGOUT_USER: string = 'LOGOUT_USER';
  static readonly ADD_NEW_TASK: string = 'ADD_NEW_TASK';
}

export enum HomeMenuActionTypes {
  HeaderToggleButtonState = '[HEADER] Toggling button state',
  LogoutUser = '[HEADER] Logout request received',
}

// We have two approach to create Action, these are:
// 1. 'createAction' function which we get from the @ngrx/store package, a sample of this approach is commented below.
// 2. Using class, in the approach we need to implement our action class with the Action interface exposed by @ngrx/store

// Approach 2: Using Class
export class HeaderToggleButtonState implements Action {
  readonly type = HomeMenuActionTypes.HeaderToggleButtonState;
  constructor(public button: IButtonAction) {}
}

export class LogoutUser implements Action {
  readonly type = HomeMenuActionTypes.LogoutUser;
  constructor() {}
}

export type HeaderAction = HeaderToggleButtonState | LogoutUser;

// Approach 1 : Using createAction function
// export const headerToggleButtonState = createAction(
//   '[HEADER] Toggling button state',
//   props<{ button: IButtonAction }>()
// );

// export const logoutAction = createAction('[HEADER] Logout request received');
