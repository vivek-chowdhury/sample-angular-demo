import { ILoginState } from './ilogin.state';
import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';

// We have two approach to create Action, these are:
// 1. 'createAction' function which we get from the @ngrx/store package, a sample of this approach is commented below.
// 2. Using class, in the approach we need to implement our action class with the Action interface exposed by @ngrx/store

// Approach 2: Using Class
export enum LoginActionTypes {
  ToggleRememberMe = '[LOGIN] Toggle Remember me Check box',
  RememberUserCredential = '[LOGIN VALIDATED] Saving user credential',
}
export class ToggleRememberMe implements Action {
  readonly type = LoginActionTypes.ToggleRememberMe;
  constructor(public payload: boolean) {}
}

export class RememberUserCredential implements Action {
  readonly type = LoginActionTypes.RememberUserCredential;
  constructor(public payload: ILoginState) {}
}

export type LoginAction = ToggleRememberMe | RememberUserCredential;

// Approach 1 : Using createAction function
// export const toggleRememberMeCheckBox = createAction(
//   '[LOGIN] Toggle Remember me Check box',
//   props<{ login: ILoginState }>()
// );

// export const rememberUserCredential = createAction(
//   '[LOGIN VALIDATED] Saving user credential',
//   props<{ login: ILoginState }>()
// );
