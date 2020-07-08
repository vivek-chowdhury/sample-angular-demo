import * as LoginActions from './login.actions';
import { ILoginState } from './ilogin.state';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

const intialLoginState: ILoginState = {
  rememberMe: false,
  user: null,
};

const loginFeatireSelector = createFeatureSelector<ILoginState>('login');

export const loginSelector = createSelector(
  loginFeatireSelector,
  (currentState) => {
    return currentState; // Here we can manipulate slice and send that specific part to component.
  }
);

export const loginReducer = createReducer<ILoginState>(
  intialLoginState,
  // This string will appear in DevTool for debugging
  on(
    LoginActions.toggleRememberMeCheckBox,
    (previousState, action): ILoginState => {
      console.log('Orginal state: ', JSON.stringify(previousState));
      return {
        ...previousState,
        ...action.login,
      };
    }
  ),

  on(LoginActions.rememberUserCredential, (previousState, action) => {
    return {
      ...previousState,
      ...action.login,
    };
  })
);
