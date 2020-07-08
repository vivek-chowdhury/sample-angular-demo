import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ActionConstants } from './action-constants';
import { TaskService } from '../../../core/services/task-service.service';
import { IHome } from '../state/ihome.state';
import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';

import * as TaskEvents from '../../../core/services/interfaces/itask.interface';
import * as HeaderActions from './../../../core/header/state/header.action';
import * as HomeReducer from './../state/home.reducer';
import * as HomeActions from './../state/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dialogRef: MatDialogRef<DialogBoxComponent>;
  taskList: TaskEvents.ITask[];

  constructor(
    private taskService: TaskService,
    private matDialog: MatDialog,
    private spinnerManager: SpinnerManagerService,
    private store: Store<IHome>
  ) {}

  /**
   * @description This function is invoked when View is initialised it is responsible for
   * setting default values to members variables and fetching initial data from server.
   *
   */
  ngOnInit(): void {
    this.taskList = [];

    this.store.select(HomeReducer.taskListSelector).subscribe((tasks) => {
      if (tasks) {
        this.taskList = tasks.tasks;
        if (tasks.taskFetched) {
          this.spinnerManager.hideSpinner();
        }
      }
    });
    // this.getTaskList();
    this.store.dispatch(HomeActions.loadTaskList());
    this.store.dispatch(
      HeaderActions.headerToggleButtonState({
        button: { isAddTaskVisible: true, isLogoutRequired: true },
      })
    );
  }

  /**
   * @description This function is responsible for fetching task list from the server and hiding
   * spinner once done.
   *
   */
  // This method is commented because now we are fetcing task list from Ngrx Effects.
  // getTaskList(): void {
  //   this.taskService.getTaskList().subscribe((list) => {
  //     this.taskList = list;
  //     const timeoutId = setTimeout(() => {
  //       this.spinnerManager.hideSpinner();
  //       clearTimeout(timeoutId);
  //     }, 10);
  //   });
  // }

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
    this.taskService.deleteTask(task).subscribe((result) => {
      if (result) {
        this.taskList = result;
      }
    });
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
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskList = result;
      }
    });
  }
}
