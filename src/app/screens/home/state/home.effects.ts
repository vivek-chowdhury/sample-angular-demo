import {
  mergeMap,
  map,
  catchError,
  concatMap,
  mergeAll,
  switchMap,
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
   * @description
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
   * @description
   */
  updateExistingTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.updateExistingTask),
      mergeMap((action) => {
        return this.taskService.updateTask(action.task).pipe(
          switchMap((taskList) => {
            return of(
              HomeActions.updateExistingTaskSuccess({ tasks: taskList })
            );
          }),
          catchError((error) =>
            of(HomeActions.updateExistingTaskFailed({ error }))
          )
        );
      })
    );
  });

  /**
   * @description
   */
  addNewTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.addNewTask),
      concatMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          map((taskList) => HomeActions.addNewTaskSuccess({ tasks: taskList })),
          catchError((error) => of(HomeActions.addNewTaskFailed({ error })))
        )
      )
    );
  });

  /**
   * @description
   */
  deleteExistingTask$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HomeActions.deleteExistingTask),
      concatMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          map((taskList) =>
            HomeActions.deleteExistingTaskSuccess({ tasks: taskList })
          ),
          catchError((error) =>
            of(HomeActions.deleteExistingTaskFailed({ error }))
          )
        )
      )
    );
  });
}
