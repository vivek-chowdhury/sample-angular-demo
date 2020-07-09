import {
  createReducer,
  on,
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { IHomeState } from './ihome.state';
import * as HomeActions from './home.actions';

// Contains inital state of Home screen
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

// We can create Reducer using two approaches, these are:
// Approach 1: Using 'createReducer' function which is exposed by the @ngrx/store package. Example of this approach is commented below
// Approach 2: We can also export Pure function which will take state and action in parameters and return a new state. We are using
// second approach now however you can comment on the second approach and uncomment first approach to test both.

// Approach 2: Using Pure funciton
export function homeReducer(
  state: IHomeState = initialHomeState,
  action: HomeActions.HomeAction
): IHomeState {
  switch (action.type) {
    case HomeActions.HomeActionTypes.LoadTaskListSuccess:
    case HomeActions.HomeActionTypes.AddNewTaskSuccess:
    case HomeActions.HomeActionTypes.UpdateExistingTaskSuccess:
    case HomeActions.HomeActionTypes.DeleteExistingTaskSuccess:
      return { ...state, tasks: action.tasks, taskFetched: true };
    case HomeActions.HomeActionTypes.LoadTaskListFailure:
      return { ...state, tasks: [], taskFetched: false, error: action.error };
  }
  return state;
}

// Approach 1: Using createReducer function
/**
 * @description This createReducer contains list of reducer responsible for handling
 * state of Home screen.
 *
 */
// export const homeReducer = createReducer<IHomeState>(
//   initialHomeState,
//   // This will invoke when application successfully fetch list of task from server
//   on(
//     HomeActions.loadTaskListSuccess,
//     (previousState, action): IHomeState => {
//       return {
//         ...previousState,
//         tasks: action.tasks,
//         taskFetched: true,
//       };
//     }
//   ),

//   // This will invoke when application failed to load task from server
//   on(HomeActions.loadTaskListFailed, (previousState, action) => {
//     return {
//       ...previousState,
//       error: action.error,
//     };
//   }),

//   // This will invoke on successful updation of selected task
//   on(
//     HomeActions.updateExistingTaskSuccess,
//     (previousState, action): IHomeState => {
//       return {
//         ...previousState,
//         tasks: action.tasks,
//         taskFetched: true,
//       };
//     }
//   ),

//   // This will invoke on successful addtion of new task
//   on(
//     HomeActions.addNewTaskSuccess,
//     (previousState, action): IHomeState => {
//       return {
//         ...previousState,
//         tasks: action.tasks,
//         taskFetched: true,
//       };
//     }
//   ),

//   // This will invoke on successful deletion of selected task
//   on(
//     HomeActions.deleteExistingTaskSuccess,
//     (previousState, action): IHomeState => {
//       return {
//         ...previousState,
//         tasks: action.tasks,
//         taskFetched: true,
//       };
//     }
//   )
// );
