import { ITask } from './../../../core/services/interfaces/itask.interface';
import {
  mergeMap,
  map,
  catchError,
  concatMap,
  mergeAll,
  switchMap,
  switchAll,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TaskService } from './../../../core/services/task-service.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(private action$: Actions, private taskService: TaskService) {}

  /**
   * @description This effect is responsible for fetching task list from server and dispatching new
   * action depending upon response from server.
   */
  loadTaskList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.loadTaskList),
      mergeMap(() =>
        this.taskService.getTaskList().pipe(
          map((tasks) => HomeActions.loadTaskListSuccess({ tasks })),
          catchError((error) => of(HomeActions.loadTaskListFailed({ error })))
        )
      )
    );
  });

  /**
   * @description This effect is responsible for updating editing task and fetching latest task list
   * from server.
   */
  updateExistingTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.updateExistingTask),
      mergeMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          mergeMap(() => {
            return this.taskService.getTaskList().pipe(
              map((task) => {
                return HomeActions.updateExistingTaskSuccess({ tasks: task });
              })
            );
          }),
          catchError((error) =>
            of(HomeActions.updateExistingTaskFailed({ error }))
          )
        )
      )
    );
  });

  /**
   * @description This effect is responsible for adding new task and fetching latest task list
   * from server.
   */
  addNewTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.addNewTask),
      mergeMap((action) =>
        this.taskService.insertTask(action.task).pipe(
          mergeMap(() => {
            return this.taskService.getTaskList().pipe(
              map((task) => {
                return HomeActions.addNewTaskSuccess({ tasks: task });
              })
            );
          }),
          catchError((error) => of(HomeActions.addNewTaskFailed({ error })))
        )
      )
    );
  });

  /**
   * @description This effect is responsible for deleting exiting task and fetching latest task list
   * from server.
   */
  deleteExistingTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.deleteExistingTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.task).pipe(
          mergeMap(() => {
            return this.taskService.getTaskList().pipe(
              map((task) => {
                return HomeActions.deleteExistingTaskSuccess({ tasks: task });
              })
            );
          }),
          catchError((error) =>
            of(HomeActions.deleteExistingTaskFailed({ error }))
          )
        )
      )
    );
  });
}
