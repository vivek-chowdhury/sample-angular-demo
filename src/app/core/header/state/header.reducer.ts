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

export const headerReducer = createReducer<HomeStates.IHeaderState>(
  HomeStates.initialHeaderState,
  on(
    HeaderActions.headerToggleButtonState,
    (state, action): HomeStates.IHeaderState => {
      const result: HomeStates.IHeaderState = { ...state, ...action.button };
      return result;
    }
  ),
  on(
    HeaderActions.logoutAction,
    (state, action): HomeStates.IHeaderState => {
      const result: HomeStates.IHeaderState = {
        ...state,
        isUserLoggedIn: false,
      };
      return result;
    }
  )
);
