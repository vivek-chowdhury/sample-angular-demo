import * as Actions from './login.actions';
import { ILoginState } from './ilogin.state';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

// Initial state of login
const intialLoginState: ILoginState = {
  rememberMe: false,
  user: null,
};

// Selector to retrive specific slice of state from store, here we are slicing state related to login.
const loginFeatireSelector = createFeatureSelector<ILoginState>('login');
export const loginSelector = createSelector(
  loginFeatireSelector,
  (currentState) => {
    return currentState; // Here we can manipulate slice and send that specific part to component.
  }
);

// We can create Reducer using two approaches, these are:
// Approach 1: Using 'createReducer' function which is exposed by the @ngrx/store package. Example of this approach is commented below
// Approach 2: We can also export Pure function which will take state and action in parameters and return a new state. We are using
// second approach now however you can comment on the second approach and uncomment first approach to test both.

// Approach 2: Using Pure funciton
export function loginReducer(
  state: ILoginState = intialLoginState,
  action: Actions.LoginAction
): ILoginState {
  switch (action.type) {
    case Actions.LoginActionTypes.ToggleRememberMe:
      return { ...state, rememberMe: action.payload };
    case Actions.LoginActionTypes.RememberUserCredential:
      return { ...state, ...action.payload };
  }
  return state;
}

// Approach 1: Using createReducer function
// export const loginReducer = createReducer<ILoginState>(
//   intialLoginState,
//   // This string will appear in DevTool for debugging
//   on(
//     Actions.toggleRememberMeCheckBox,
//     (previousState, action): ILoginState => {
//       console.log('Orginal state: ', JSON.stringify(previousState));
//       return {
//         ...previousState,
//         ...action.login,
//       };
//     }
//   ),

//   on(Actions.rememberUserCredential, (previousState, action) => {
//     return {
//       ...previousState,
//       ...action.login,
//     };
//   })
// );
