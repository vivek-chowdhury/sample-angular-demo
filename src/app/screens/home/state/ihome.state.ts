import { ITask } from './../../../core/services/interfaces/itask.interface';
import * as fromRoot from '../../../state/iapp.state';

export interface IHome extends fromRoot.IAppState {
  home: IHomeState;
}

export interface IHomeState {
  tasks: ITask[];
  selectedTask: ITask;
  error: string;
  taskFetched: boolean;
}
