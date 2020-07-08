import { ILoginState } from './ilogin.state';
import { createAction, props } from '@ngrx/store';

export const toggleRememberMeCheckBox = createAction(
  '[LOGIN] Toggle Remember me Check box',
  props<{ login: ILoginState }>()
);

export const rememberUserCredential = createAction(
  '[LOGIN VALIDATED] Saving user credential',
  props<{ login: ILoginState }>()
);
