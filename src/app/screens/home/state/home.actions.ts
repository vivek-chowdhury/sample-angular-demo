import { ITask } from './../../../core/services/interfaces/itask.interface';
import { createAction, props, Action } from '@ngrx/store';

// We have two approach to create Action, these are:
// 1. 'createAction' function which we get from the @ngrx/store package, a sample of this approach is commented below.
// 2. Using class, in the approach we need to implement our action class with the Action interface exposed by @ngrx/store

// Approach 2: Using Class
export enum HomeActionTypes {
  LoadTaskList = '[HOME API Call] Fetching task list',
  LoadTaskListSuccess = '[HOME API Response] Task List fetched successfully',
  LoadTaskListFailure = '[HOME API Response] Task List fetched failure',
  AddNewTask = '[DIALOG BOX API Call] Adding new Task',
  AddNewTaskSuccess = '[HOME EFFECTS RESPONSE] Successfully added new task',
  AddNewTaskFailure = '[HOME EFFECTS RESPONSE] Failed to add new task',
  UpdateExistingTask = '[DIALOG BOX API Call] Update existing Task',
  UpdateExistingTaskSuccess = '[HOME EFFECTS RESPONSE] Successfully updated existing task',
  UpdateExistingTaskFailure = '[HOME EFFECTS RESPONSE] Failed to update existing task',
  DeleteExistingTask = '[HOME API Call] Deleting existing Task',
  DeleteExistingTaskSuccess = '[HOME EFFECTS RESPONSE] Successfully deleted existing task',
  DeleteExistingTaskFailure = '[HOME EFFECTS RESPONSE] Failed to deleted existing task',
}

export class LoadTaskList implements Action {
  readonly type = HomeActionTypes.LoadTaskList;
  constructor() {}
}

export class LoadTaskListSuccess implements Action {
  readonly type = HomeActionTypes.LoadTaskListSuccess;
  constructor(public tasks: ITask[]) {}
}

export class LoadTaskListFailure implements Action {
  readonly type = HomeActionTypes.LoadTaskListFailure;
  constructor(public error: string) {}
}

export class AddNewTask implements Action {
  readonly type = HomeActionTypes.AddNewTask;
  constructor(public task: ITask) {}
}

export class AddNewTaskSuccess implements Action {
  readonly type = HomeActionTypes.AddNewTaskSuccess;
  constructor(public tasks: ITask[]) {}
}

export class AddNewTaskFailure implements Action {
  readonly type = HomeActionTypes.AddNewTaskFailure;
  constructor(public error: string) {}
}

export class UpdateExistingTask implements Action {
  readonly type = HomeActionTypes.UpdateExistingTask;
  constructor(public task: ITask) {}
}

export class UpdateExistingTaskSuccess implements Action {
  readonly type = HomeActionTypes.UpdateExistingTaskSuccess;
  constructor(public tasks: ITask[]) {}
}

export class UpdateExistingTaskFailure implements Action {
  readonly type = HomeActionTypes.UpdateExistingTaskFailure;
  constructor(public error: string) {}
}

export class DeleteExistingTask implements Action {
  readonly type = HomeActionTypes.DeleteExistingTask;
  constructor(public task: ITask) {}
}

export class DeleteExistingTaskSuccess implements Action {
  readonly type = HomeActionTypes.DeleteExistingTaskSuccess;
  constructor(public tasks: ITask[]) {}
}

export class DeleteExistingTaskFailure implements Action {
  readonly type = HomeActionTypes.DeleteExistingTaskFailure;
  constructor(public error: string) {}
}

export type HomeAction =
  | LoadTaskList
  | LoadTaskListSuccess
  | LoadTaskListFailure
  | AddNewTask
  | AddNewTaskSuccess
  | AddNewTaskFailure
  | UpdateExistingTask
  | UpdateExistingTaskSuccess
  | UpdateExistingTaskFailure
  | DeleteExistingTask
  | DeleteExistingTaskSuccess
  | DeleteExistingTaskFailure;

// Approach 1: Using createAction function
// -------------LOADING INITIAL LIST OF TASK FROM SERVER------------------
// export const loadTaskList = createAction('[HOME] Fetching task list');
// export const loadTaskListSuccess = createAction(
//   '[HOME] Task List fetched successfully',
//   props<{ tasks: ITask[] }>()
// );
// export const loadTaskListFailed = createAction(
//   '[HOME] Task List fetched failed',
//   props<{ error: string }>()
// );

// -------------ADDING NEW TASK------------------
// export const addNewTask = createAction(
//   '[DIALOG BOX] Adding new Task',
//   props<{ task: ITask }>()
// );

// export const addNewTaskSuccess = createAction(
//   '[HOME EFFECTS] Successfully added new task',
//   props<{ tasks: ITask[] }>()
// );

// export const addNewTaskFailed = createAction(
//   '[HOME EFFECTS] Failed to add new task',
//   props<{ error: string }>()
// );

// -------------UPDATING EXISTING TASK------------------
// export const updateExistingTask = createAction(
//   '[DIALOG BOX] Update existing Task',
//   props<{ task: ITask }>()
// );

// export const updateExistingTaskSuccess = createAction(
//   '[HOME EFFECTS] Successfully updated existing task',
//   props<{ tasks: ITask[] }>()
// );

// export const updateExistingTaskFailed = createAction(
//   '[HOME EFFECTS] Failed to update existing task',
//   props<{ error: string }>()
// );

// -------------DELETING EXISTING TASK------------------
// export const deleteExistingTask = createAction(
//   '[HOME] Deleting existing Task',
//   props<{ task: ITask }>()
// );

// export const deleteExistingTaskSuccess = createAction(
//   '[HOME EFFECTS] Successfully deleted existing task',
//   props<{ tasks: ITask[] }>()
// );

// export const deleteExistingTaskFailed = createAction(
//   '[HOME EFFECTS] Failed to deleted existing task',
//   props<{ error: string }>()
// );
