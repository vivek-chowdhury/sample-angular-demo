export interface ITask {
  description: string;
  id: string;
  priority: string;
  status: string;
  key?: string;
  shortDescription?: string;
}

export interface ITaskEvent {
  action: string;
  task: ITask;
}
