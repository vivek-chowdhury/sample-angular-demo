import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ActionConstants } from './action-constants';
import { TaskService } from '../../../core/services/task-service.service';
import { IHome } from '../state/ihome.state';
import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';
import { SCREENTYPES } from './../../../core/header/state/iheader.state';
import {
  IMessageBroadcaster,
  AppBroadcasterService,
} from './../../../core/services/app-broadcaster.service';

import * as TaskEvents from '../../../core/services/interfaces/itask.interface';
import * as HeaderActions from './../../../core/header/state/header.action';
import * as HomeReducer from './../state/home.reducer';
import * as HomeActions from './../state/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  dialogRef: MatDialogRef<DialogBoxComponent>;
  taskList: TaskEvents.ITask[];
  componentActive = true;

  constructor(
    private taskService: TaskService,
    private matDialog: MatDialog,
    private spinnerManager: SpinnerManagerService,
    private store: Store<IHome>,
    private broadcaster: AppBroadcasterService
  ) {}

  /**
   * @description This function is invoked when View is initialised it is responsible for
   * setting default values to members variables and fetching initial data from server.
   *
   */
  ngOnInit(): void {
    this.taskList = [];
    this.registerStore();
    // this.getTaskList();
    this.broadcaster.messageBroadcaster$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((message) => {
        this.onRequestFromHeaderReceived(message);
      });

    // Approach 1: To test this uncomment approach 2 from reducer and then uncomment this
    // this.store.dispatch(HomeActions.loadTaskList());
    // this.store.dispatch(
    //   HeaderActions.headerToggleButtonState({
    //     button: { isUserLoggedIn: true, screenType: SCREENTYPES.HOME_SCREEN },
    //   })
    // );

    // Approach 2
    this.store.dispatch(new HomeActions.LoadTaskList());
    this.store.dispatch(
      new HeaderActions.HeaderToggleButtonState({
        isUserLoggedIn: true,
        screenType: SCREENTYPES.HOME_SCREEN,
      })
    );
  }

  /**
   * @description This method is responsible for subscrbing store and listening to any changes
   *  in Home state.
   */
  registerStore(): void {
    this.store
      .pipe(
        select(HomeReducer.taskListSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((tasks) => {
        if (tasks) {
          this.taskList = tasks.tasks;
          if (tasks.taskFetched) {
            this.spinnerManager.hideSpinner();
          }
          if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
          }
        }
      });
  }

  /**
   * @description This function is responsible for fetching task list from the server and hiding
   * spinner once done.
   * [This method is commented because now we are fetcing task list from Ngrx Effects.]
   */
  // getTaskList(): void {
  //   this.taskService.getTaskList().subscribe((list) => {
  //     this.taskList = list;
  //     const timeoutId = setTimeout(() => {
  //       this.spinnerManager.hideSpinner();
  //       clearTimeout(timeoutId);
  //     }, 10);
  //   });
  // }

  onRequestFromHeaderReceived(message: IMessageBroadcaster): void {
    if (!message) {
      return;
    }
    switch (message.messageType) {
      case HeaderActions.HeaderMenuActions.ADD_NEW_TASK:
        this.addNewTask();
        break;
    }
  }

  /**
   * @description This funciton is invoked when user clicks on the 'Add new task' button. It will open
   *  blank task dialog.
   */
  addNewTask(): void {
    this.openDialog();
  }

  /**
   * @description This function is invoked when user clicks on the 'Update' button, to update the
   * existing task.
   *
   * @param event: ITaskEvent
   */
  onUpdateTaskInvoked(event: TaskEvents.ITaskEvent): void {
    switch (event.action) {
      case ActionConstants.DELETE_TASK:
        this.deletedSelectedTask(event.task);
        break;
      case ActionConstants.UPDATE_TASK:
        this.openDialog(event.task);
        break;
    }
  }

  /**
   * @description This function is responsible for deleting selected task from the list.
   *
   * @param ITask It contains task reference
   */
  deletedSelectedTask(task: TaskEvents.ITask): void {
    // this.taskService.deleteTask(task).subscribe((result) => {
    //   if (result) {
    //     this.taskList = result;
    //   }
    // });

    // Approach 1: To test this uncomment approach 2 from reducer and then uncomment this
    // this.store.dispatch(HomeActions.deleteExistingTask({ task }));

    // Approach 2
    this.store.dispatch(new HomeActions.DeleteExistingTask(task));
  }

  /**
   * @description This functiton is invoked when user either request to create new task or trying to
   * update existing one.
   *
   * @param task: ITask = null
   */
  openDialog(task: TaskEvents.ITask = null): void {
    const config = new MatDialogConfig();
    config.data = {
      isNewTask: true,
      task,
    };
    this.dialogRef = this.matDialog.open(DialogBoxComponent, config);
    // Below statement is commented after implementing Ngrx effect
    // this.dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.taskList = result;
    //   }
    // });
  }

  /**
   * @description This method will invoked when component is removed from the display list,
   * it is responsible for setting member variable to true which will further unsubscibe any
   * subscription to store.
   */
  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
