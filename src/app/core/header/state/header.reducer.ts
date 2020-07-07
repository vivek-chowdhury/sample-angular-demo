import { headerToggleButtonState } from './header.action';
import { IHeaderState } from './iheader.state';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

const initialHeaderState: IHeaderState = {
  homeOptions: {
    isAddTaskVisible: false,
  },
  logout: {
    isVisible: false,
  },
};

const headerFeatureSelector = createFeatureSelector<IHeaderState>('header');
export const headerSelector = createSelector(
  headerFeatureSelector,
  (state) => state
);

export const headerReducer = createReducer<IHeaderState>(
  initialHeaderState,
  on(
    headerToggleButtonState,
    (state, action): IHeaderState => {
      const result: IHeaderState = { ...state };
      result.logout = {
        ...state.logout,
        isVisible: action.button.isLogoutRequired,
      };
      result.homeOptions = {
        ...state.homeOptions,
        isAddTaskVisible: action.button.isAddTaskVisible,
      };
      return result;
    }
  )
);
