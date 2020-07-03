export class MockTask {
  static getTaskList() {
    return require('./dao/task-list.json');
  }

  static getParsedTaskList() {
    return require('./dao/parsed-task-list.json');
  }
  static updateTaskList() {
    return require('./dao/update-task.json');
  }
}
