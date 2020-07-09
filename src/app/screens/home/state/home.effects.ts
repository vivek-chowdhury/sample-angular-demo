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
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';

import { TaskService } from './../../../core/services/task-service.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(private action$: Actions, private taskService: TaskService) {}

  /**
   * @description This effect is responsible for fetching task list from server and dispatching new
   * action depending upon response from server.
   */
  // Appraoch 2 Using Action Class, Pure reducer function
  @Effect()
  loadTaskList$: Observable<Action> = this.action$.pipe(
    ofType(HomeActions.HomeActionTypes.LoadTaskList),
    mergeMap(() =>
      this.taskService.getTaskList().pipe(
        map((tasks) => new HomeActions.LoadTaskListSuccess(tasks)),
        catchError((error) => of(new HomeActions.LoadTaskListFailure(error)))
      )
    )
  );
  // Approach 1 Using createAction, createReducer and createEffect
  // loadTaskList$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(HomeActions.loadTaskList),
  //     mergeMap(() =>
  //       this.taskService.getTaskList().pipe(
  //         map((tasks) => HomeActions.loadTaskListSuccess({ tasks })),
  //         catchError((error) => of(HomeActions.loadTaskListFailed({ error })))
  //       )
  //     )
  //   );
  // });

  /**
   * @description This effect is responsible for updating editing task and fetching latest task list
   * from server.
   */
  // Appraoch 2 Using Action Class, Pure reducer function
  @Effect()
  updateExistingTask$: Observable<Action> = this.action$.pipe(
    ofType(HomeActions.HomeActionTypes.UpdateExistingTask),
    map((action: HomeActions.UpdateExistingTask) => action.task),
    mergeMap((task) =>
      this.taskService.updateTask(task).pipe(
        mergeMap(() => {
          return this.taskService.getTaskList().pipe(
            map((tasks) => {
              return new HomeActions.UpdateExistingTaskSuccess(tasks);
            })
          );
        }),
        catchError((error) =>
          of(new HomeActions.UpdateExistingTaskFailure(error))
        )
      )
    )
  );
  // Approach 1 Using createAction, createReducer and createEffect
  // updateExistingTask$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(HomeActions.updateExistingTask),
  //     mergeMap((action) =>
  //       this.taskService.updateTask(action.task).pipe(
  //         mergeMap(() => {
  //           return this.taskService.getTaskList().pipe(
  //             map((task) => {
  //               return HomeActions.updateExistingTaskSuccess({ tasks: task });
  //             })
  //           );
  //         }),
  //         catchError((error) =>
  //           of(HomeActions.updateExistingTaskFailed({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

  /**
   * @description This effect is responsible for adding new task and fetching latest task list
   * from server.
   */
  // Appraoch 2 Using Action Class, Pure reducer function
  @Effect()
  addNewTask$: Observable<Action> = this.action$.pipe(
    ofType(HomeActions.HomeActionTypes.AddNewTask),
    map((action: HomeActions.AddNewTask) => action.task),
    mergeMap((task) =>
      this.taskService.insertTask(task).pipe(
        mergeMap(() => {
          return this.taskService.getTaskList().pipe(
            map((tasks) => {
              return new HomeActions.AddNewTaskSuccess(tasks);
            })
          );
        }),
        catchError((error) => of(new HomeActions.AddNewTaskFailure(error)))
      )
    )
  );

  // Approach 1 Using createAction, createReducer and createEffect
  // addNewTask$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(HomeActions.addNewTask),
  //     mergeMap((action) =>
  //       this.taskService.insertTask(action.task).pipe(
  //         mergeMap(() => {
  //           return this.taskService.getTaskList().pipe(
  //             map((task) => {
  //               return HomeActions.addNewTaskSuccess({ tasks: task });
  //             })
  //           );
  //         }),
  //         catchError((error) => of(HomeActions.addNewTaskFailed({ error })))
  //       )
  //     )
  //   );
  // });

  /**
   * @description This effect is responsible for deleting exiting task and fetching latest task list
   * from server.
   */
  // Appraoch 2 Using Action Class, Pure reducer function
  @Effect()
  deleteExistingTask$: Observable<Action> = this.action$.pipe(
    ofType(HomeActions.HomeActionTypes.DeleteExistingTask),
    map((action: HomeActions.DeleteExistingTask) => action.task),
    mergeMap((task) =>
      this.taskService.deleteTask(task).pipe(
        mergeMap(() => {
          return this.taskService.getTaskList().pipe(
            map((tasks) => {
              return new HomeActions.DeleteExistingTaskSuccess(tasks);
            })
          );
        }),
        catchError((error) =>
          of(new HomeActions.DeleteExistingTaskFailure(error))
        )
      )
    )
  );
}
// Approach 1 Using createAction, createReducer and createEffect
//   deleteExistingTask$ = createEffect(() => {
//     return this.action$.pipe(
//       ofType(HomeActions.deleteExistingTask),
//       mergeMap((action) =>
//         this.taskService.deleteTask(action.task).pipe(
//           mergeMap(() => {
//             return this.taskService.getTaskList().pipe(
//               map((task) => {
//                 return HomeActions.deleteExistingTaskSuccess({ tasks: task });
//               })
//             );
//           }),
//           catchError((error) =>
//             of(HomeActions.deleteExistingTaskFailed({ error }))
//           )
//         )
//       )
//     );
//   });
// }
