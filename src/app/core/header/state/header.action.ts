import { createAction, props } from '@ngrx/store';
import { SCREENTYPES } from './iheader.state';

export interface IButtonAction {
  screenType: SCREENTYPES;
  isUserLoggedIn?: boolean;
}

export class HeaderMenuActions {
  static readonly LOGOUT_USER: string = 'LOGOUT_USER';
  static readonly ADD_NEW_TASK: string = 'ADD_NEW_TASK';
}

export const headerToggleButtonState = createAction(
  '[HEADER] Toggling button state',
  props<{ button: IButtonAction }>()
);

export const logoutAction = createAction('[HEADER] Logout request received');
