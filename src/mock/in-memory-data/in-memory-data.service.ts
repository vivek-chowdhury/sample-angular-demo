import { ITask } from './../../app/core/services/interfaces/itask.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
} from 'angular-in-memory-web-api';
import { HttpHeaders, HttpRequest } from '@angular/common/http';

export interface ITaskList {
  task: [];
}

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService extends InMemoryDbService {
  private taskList = [];
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private primaryKeyCounter: number;

  createDb(): {} | Observable<ITaskList> {
    this.primaryKeyCounter = 2;
    this.taskList = [
      {
        id: '1',
        key: '-MBJxU7rVAPGD4LuyQaL',
        description: 'New Task Added',
        priority: 'high',
        shortDescription: 'This task is added to check live update',
        status: 'notstarted',
      },
      {
        id: '2',
        key: '-MBJy1c3-E68mW3H30h0',
        description: 'Lets do something',
        priority: 'high',
        shortDescription: 'Having fun while creating task like this',
        status: 'notstarted',
      },
    ];
    return { task: this.taskList };
  }

  get(reqInfo: RequestInfo) {
    const tasks: ITaskList = reqInfo.utils.getDb() as ITaskList;
    return this.getResponse(reqInfo, tasks.task);
  }

  post(reqInfo: RequestInfo) {
    const httpBody = reqInfo.req['body'];
    httpBody.id = String(++this.primaryKeyCounter);
    const taskList: ITask[] = this.getTaskList(reqInfo);
    taskList.push(httpBody);
    return this.getResponse(reqInfo, httpBody);
  }

  put(reqInfo: RequestInfo) {
    const userRequest = this.getRecordId(reqInfo);
    const taskList: ITask[] = this.getTaskList(reqInfo);
    taskList.map((task: ITask) => {
      if (task.key === userRequest.recordId) {
        Object.assign(task, userRequest.body);
      }
    });
    return this.getResponse(reqInfo, userRequest.body);
  }

  delete(reqInfo: RequestInfo) {
    const userRequest = this.getRecordId(reqInfo);
    const taskList: ITask[] = this.getTaskList(reqInfo);

    let i = 0;
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].key === userRequest.recordId) {
        break;
      }
    }
    taskList.splice(i, 1);
    return this.getResponse(reqInfo, {});
  }

  getResponse(reqInfo: RequestInfo, data: any) {
    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

      return data
        ? {
            body: dataEncapsulation ? { data } : data,
            status: STATUS.OK,
            headers: this.headers,
          }
        : {
            body: { error: `Cannot fetch data from in-memory-service` },
            status: STATUS.NOT_FOUND,
          };
    });
  }

  getRecordId(reqInfo: RequestInfo) {
    const httpBody = reqInfo.req['body'];
    const url = reqInfo.url;
    let recordid = url.split('api/task/Task/')[1];
    recordid = recordid.split('.json')[0];
    return { recordId: recordid, body: httpBody };
  }

  getTaskList(reqInfo: RequestInfo) {
    const tasks: ITaskList = reqInfo.utils.getDb() as ITaskList;
    const taskList: ITask[] = tasks.task;
    return taskList;
  }
}
