import { MockTask } from './../../../mock/mock-service/mock-task-list.service';
import { ITask } from './interfaces/itask.interface';
import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TaskService } from './task-service.service';
import { of } from 'rxjs';

describe('TaskServiceService', () => {
  let service: TaskService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const mockList = MockTask.getTaskList();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get method and return task array', fakeAsync(() => {
    let result;
    const http: HttpTestingController = TestBed.get(HttpTestingController);
    service.getTaskList().subscribe((response) => (result = response));
    http.expectOne({ method: 'GET' }).flush(mockList);
    tick();
    expect(result).toBeDefined();
  }));

  it('should call http request can return empty array', fakeAsync(() => {
    let result;
    const http: HttpTestingController = TestBed.get(HttpTestingController);
    service.getTaskList().subscribe((response) => (result = response));
    http.expectOne({ method: 'GET' }).flush({});
    tick();
    expect(result).toEqual([]);
  }));

  it('should call http put method and return task array', fakeAsync(() => {
    let result;
    const updateTask = spyOn(service, 'updateTask').and.returnValue(of(true));

    const task: ITask = {
      id: '10',
      description: 'Sample',
      shortDescription: 'Short Description',
      priority: '1',
      status: 'Not Started',
    };
    service.updateTask(task).subscribe((response) => (result = response));
    tick();
    expect(updateTask).toHaveBeenCalled();
  }));

  it('should call http post method and return task array', fakeAsync(() => {
    let result;
    const insertTask = spyOn(service, 'insertTask').and.returnValue(of(true));

    const task: ITask = {
      id: '10',
      description: 'Sample',
      shortDescription: 'Short Description',
      priority: '1',
      status: 'Not Started',
    };
    service.insertTask(task).subscribe((response) => (result = response));
    tick();
    expect(insertTask).toHaveBeenCalled();
  }));
});
