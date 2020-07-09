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
   * @description
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
  //   addNewTask$ = createEffect(() => {
  //     return this.action$.pipe(
  //       ofType(HomeActions.addNewTask),
  //       concatMap((action) =>
  //         this.taskService.updateTask(action.task).pipe(
  //           map((taskList) => HomeActions.addNewTaskSuccess({ tasks: taskList })),
  //           catchError((error) => of(HomeActions.addNewTaskFailed({ error })))
  //         )
  //       )
  //     );
  //   });

  /**
   * @description
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
  //   deleteExistingTask$ = createEffect(() => {
  //     return this.action$.pipe(
  //       ofType(HomeActions.deleteExistingTask),
  //       concatMap((action) =>
  //         this.taskService.updateTask(action.task).pipe(
  //           map((taskList) =>
  //             HomeActions.deleteExistingTaskSuccess({ tasks: taskList })
  //           ),
  //           catchError((error) =>
  //             of(HomeActions.deleteExistingTaskFailed({ error }))
  //           )
  //         )
  //       )
  //     );
  //   });
}
