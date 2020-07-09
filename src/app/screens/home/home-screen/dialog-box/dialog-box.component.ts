import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormConstants } from './form-constants';
import { IHome } from './../../state/ihome.state';
import { TaskService } from './../../../../core/services/task-service.service';
import * as HomeActions from './../../state/home.actions';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnInit, OnDestroy {
  @Input() title = 'Testing ';
  taskId: string;
  states = FormConstants.STATES;
  status = FormConstants.STATUS;
  taskGroup: FormGroup;
  updateObservable$;
  insertObservale$;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private fb: FormBuilder,
    private taskService: TaskService,
    private store: Store<IHome>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  /**
   * @description This function is invoked when View is initialised it is responsible for
   * setting default values to the form controlls and members variables.
   *
   */
  ngOnInit(): void {
    this.title =
      this.data && this.data.task ? 'Edit Existing Task' : 'Add New Task';

    this.taskId = '';

    this.taskGroup = this.fb.group({
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.populateFormValue(this.data);
  }

  /**
   * @description This function is responsile for populating task form
   * it data is injected.
   *
   */
  populateFormValue({ task }): void {
    if (!task) {
      return;
    }
    this.taskId = task.id;
    this.taskGroup.patchValue({
      description: task.description,
      shortDescription: task.shortDescription,
      priority: task.priority,
      status: task.status,
    });
  }

  /**
   * @description This function is invoked when user clicks on the Save button. It
   * is responsible for saving current task.
   *
   */
  onSaveClicked(): void {
    if (this.taskGroup.valid) {
      const o = { ...this.taskGroup.value };

      const name: string =
        this.data && this.data.task ? this.data.task.key : '';
      o.key = name;
      if (name) {
        // this.updateObservable$ = this.taskService
        //   .updateTask(o)
        //   .subscribe((result) => {
        //     this.dialogRef.close(result);
        //   });
        this.store.dispatch(HomeActions.updateExistingTask({ task: o }));
      } else {
        // this.insertObservale$ = this.taskService
        //   .insertTask(o)
        //   .subscribe((result) => {
        //     this.dialogRef.close(result);
        //   });
        this.store.dispatch(HomeActions.addNewTask({ task: o }));
      }
    }
  }

  /**
   * @description This function is invoked when user clicks on the Close button. It will
   * directly close the window without saving anything.
   */
  onCloseClicked(): void {
    this.dialogRef.close();
  }

  /**
   * @description
   */
  ngOnDestroy(): void {
    if (this.updateObservable$) {
      this.updateObservable$.unsubscribe();
    }

    if (this.insertObservale$) {
      this.insertObservale$.unsubscribe();
    }
  }
}
