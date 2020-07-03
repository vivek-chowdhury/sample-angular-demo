import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ITaskEvent } from './../../../core/services/interfaces/itask.interface';
import { ActionConstants } from '../action-constants';

export interface PeriodicElement {
  description: string;
  shortDescription: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    description: 'this is short description',
    shortDescription: 'short description added here',
  },
  {
    description: 'this is short description',
    shortDescription: 'short description added here',
  },
  {
    description: 'this is short description',
    shortDescription: 'short description added here',
  },
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['description', 'shortDescription', 'action'];
  @Input() dataSource;

  @Output() updateTask: EventEmitter<ITaskEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * @description This function is invoked when user clicks on the Delete button, to delete existing
   * task from the list
   */
  onDeleteTaskClicked(element) {
    this.updateTask.emit({
      action: ActionConstants.DELETE_TASK,
      task: element,
    });
  }

  /**
   * @description This function is invoked when user clicks on the Update button, to update existing
   * task from the list
   */
  onUpdateTaskClicked(element) {
    this.updateTask.emit({
      action: ActionConstants.UPDATE_TASK,
      task: element,
    });
  }
}