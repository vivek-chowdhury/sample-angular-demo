import {
  createReducer,
  on,
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { IHomeState } from './ihome.state';
import * as HomeActions from './home.actions';

const initialHomeState: IHomeState = {
  tasks: [],
  selectedTask: null,
  error: '',
  taskFetched: false,
};

const taskFeatureSelector = createFeatureSelector<IHomeState>('home');
export const taskListSelector = createSelector(taskFeatureSelector, (state) => {
  return state;
});

export const errorSelector = createSelector(taskFeatureSelector, (error) => {
  return error;
});

export const homeReducer = createReducer<IHomeState>(
  initialHomeState,
  on(
    HomeActions.loadTaskListSuccess,
    (previousState, action): IHomeState => {
      return {
        ...previousState,
        tasks: action.tasks,
        taskFetched: true,
      };
    }
  ),

  on(HomeActions.loadTaskListFailed, (previousState, action) => {
    return {
      ...previousState,
      error: action.error,
    };
  }),

  on(
    HomeActions.updateExistingTaskSuccess,
    (previousState, action): IHomeState => {
      return {
        ...previousState,
        tasks: action.tasks,
        taskFetched: true,
      };
    }
  ),

  on(
    HomeActions.addNewTaskSuccess,
    (previousState, action): IHomeState => {
      return {
        ...previousState,
        tasks: action.tasks,
        taskFetched: true,
      };
    }
  ),

  on(
    HomeActions.deleteExistingTaskSuccess,
    (previousState, action): IHomeState => {
      return {
        ...previousState,
        tasks: action.tasks,
        taskFetched: true,
      };
    }
  )
);
