import {
  ITaskEvent,
  ITask,
} from './../../core/services/interfaces/itask.interface';
import { TaskService } from './../../core/services/task-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogBoxComponent } from '../common/dialog-box/dialog-box.component';
import { ActionConstants } from './action-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dialogRef: MatDialogRef<DialogBoxComponent>;
  taskList: ITask[];

  constructor(private taskService: TaskService, private matDialog: MatDialog) {}

  /**
   * @description This function is invoked when View is initialised it is responsible for
   * setting default values to members variables and fetching initial data from server.
   *
   */
  ngOnInit(): void {
    this.taskList = [];
    this.getTaskList();
  }

  /**
   * @description
   */
  getTaskList(): void {
    this.taskService.getTaskList().subscribe((list) => {
      this.taskList = list;
    });
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
  onUpdateTaskInvoked(event: ITaskEvent): void {
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
  deletedSelectedTask(task: ITask): void {
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
  openDialog(task: ITask = null): void {
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
