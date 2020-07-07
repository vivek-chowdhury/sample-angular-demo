import { toggleRememberMeCheckBox } from './login.actions';
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

export const loginSelector = createSelector(loginFeatireSelector, (state) => {
  return state; // Here we can manipulate slice and send that specific part to component.
});

export const loginReducer = createReducer<ILoginState>(
  intialLoginState,
  // This string will appear in DevTool for debugging
  on(
    toggleRememberMeCheckBox,
    (state, action): ILoginState => {
      console.log('Orginal state: ', JSON.stringify(state));
      return {
        ...state,
        ...action.login,
      };
    }
  )
);
