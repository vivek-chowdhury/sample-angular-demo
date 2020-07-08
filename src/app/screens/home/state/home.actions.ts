import { ITask } from './../../../core/services/interfaces/itask.interface';
import { createAction, props } from '@ngrx/store';

// -------------LOADING INITIAL LIST OF TASK FROM SERVER------------------
export const loadTaskList = createAction('[HOME] Fetching task list');
export const loadTaskListSuccess = createAction(
  '[HOME] Task List fetched successfully',
  props<{ tasks: ITask[] }>()
);
export const loadTaskListFailed = createAction(
  '[HOME] Task List fetched failed',
  props<{ error: string }>()
);

// -------------ADDING NEW TASK------------------
export const addNewTask = createAction(
  '[DIALOG BOX] Adding new Task',
  props<{ task: ITask }>()
);

export const addNewTaskSuccess = createAction(
  '[HOME EFFECTS] Successfully added new task',
  props<{ tasks: ITask[] }>()
);

export const addNewTaskFailed = createAction(
  '[HOME EFFECTS] Failed to add new task',
  props<{ error: string }>()
);

// -------------UPDATING EXISTING TASK------------------
export const updateExistingTask = createAction(
  '[DIALOG BOX] Update existing Task',
  props<{ task: ITask }>()
);

export const updateExistingTaskSuccess = createAction(
  '[HOME EFFECTS] Successfully updated existing task',
  props<{ tasks: ITask[] }>()
);

export const updateExistingTaskFailed = createAction(
  '[HOME EFFECTS] Failed to update existing task',
  props<{ error: string }>()
);

// -------------DELETING EXISTING TASK------------------
export const deleteExistingTask = createAction(
  '[HOME] Deleting existing Task',
  props<{ task: ITask }>()
);

export const deleteExistingTaskSuccess = createAction(
  '[HOME EFFECTS] Successfully deleted existing task',
  props<{ tasks: ITask[] }>()
);

export const deleteExistingTaskFailed = createAction(
  '[HOME EFFECTS] Failed to deleted existing task',
  props<{ error: string }>()
);
