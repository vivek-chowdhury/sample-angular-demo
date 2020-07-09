import * as HeaderActions from './header.action';
import * as HomeStates from './iheader.state';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

const headerFeatureSelector = createFeatureSelector<HomeStates.IHeaderState>(
  'header'
);
export const headerSelector = createSelector(
  headerFeatureSelector,
  (state) => state
);

// We can create Reducer using two approaches, these are:
// Approach 1: Using 'createReducer' function which is exposed by the @ngrx/store package. Example of this approach is commented below
// Approach 2: We can also export Pure function which will take state and action in parameters and return a new state. We are using
// second approach now however you can comment on the second approach and uncomment first approach to test both.

// Approach 2: Using Class
export function headerReducer(
  state: HomeStates.IHeaderState = HomeStates.initialHeaderState,
  action: HeaderActions.HeaderAction
): HomeStates.IHeaderState {
  switch (action.type) {
    case HeaderActions.HomeMenuActionTypes.HeaderToggleButtonState:
      return { ...state, ...action.button };
    case HeaderActions.HomeMenuActionTypes.LogoutUser:
      return { ...state, isUserLoggedIn: false };
  }
  return state;
}

// Approach 1: Using createReducer function
// export const headerReducer = createReducer<HomeStates.IHeaderState>(
//   HomeStates.initialHeaderState,
//   on(
//     HeaderActions.headerToggleButtonState,
//     (state, action): HomeStates.IHeaderState => {
//       const result: HomeStates.IHeaderState = { ...state, ...action.button };
//       return result;
//     }
//   ),
//   on(
//     HeaderActions.logoutAction,
//     (state, action): HomeStates.IHeaderState => {
//       const result: HomeStates.IHeaderState = {
//         ...state,
//         isUserLoggedIn: false,
//       };
//       return result;
//     }
//   )
// );
