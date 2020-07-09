import { environment } from './../../../environments/environment';
import { ITask } from './interfaces/itask.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  endpointBaseUrl: string;

  constructor(private http: HttpClient) {
    if (environment.enableMock) {
      this.endpointBaseUrl = environment.baseUrl;
    } else {
      this.endpointBaseUrl = environment.liveBaseUrl;
    }
  }

  /**
   * @description This function is responsible for fetching list of available task from server.
   * It also parse raw data and change it to array of task.
   *
   * @return Observable<ITask[]>
   */
  public getTaskList(): Observable<ITask[]> {
    return this.http.get<any>(`${this.endpointBaseUrl}/Task.json`).pipe(
      tap((data) =>
        console.log('Task List fetched from server successfully !')
      ),
      map((data) => {
        return environment.enableMock
          ? Object.assign([], data)
          : this.parseTaskList(data);
      }),
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * @description This function is responsible for parsing raw data and change it to
   * array of task.
   *
   * @praram data Contains response from server
   * @return ITask[]
   */
  parseTaskList(data): ITask[] {
    const list: ITask[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'null' && data[key] && data[key] instanceof Object) {
        const o = { ...data[key], key };
        list.push(o);
      }
    }
    return list;
  }

  /**
   * @description This function is responsible for requesting server to add new task.
   *
   * @praram task: ITask Contains reference of task
   * @return Observable<any>
   */
  public insertTask(task: ITask): Observable<any> {
    const o = { ...task };
    delete o.key;
    return this.http.post<any>(`${this.endpointBaseUrl}/Task.json`, o).pipe(
      tap((data) => console.log('New task added to Task List ! ')),
      map((data) => {
        return data;
      })
    );
  }

  /**
   * @description This function is responsible for requesting server to update existing task.
   *
   * @praram task: ITask Contains reference of task
   * @return Observable<any>
   */
  public updateTask(task: ITask): Observable<any> {
    const o = { ...task };
    const name = o.key;
    const url = `${this.endpointBaseUrl}/Task/${name}.json`;
    return this.http.put<any>(url, o).pipe(
      tap((data) => console.log('Updated existing Task ! ')),
      map((data) => {
        return data;
      })
    );
  }

  /**
   * @description This function is responsible for requesting server to delete
   * exisitng task.
   *
   * @praram task: ITask Contains reference of task
   * @return Observable<any>
   */
  public deleteTask(task: ITask): Observable<any> {
    const name = task.key;
    const url = `${this.endpointBaseUrl}/Task/${name}.json`;
    return this.http.delete<any>(url).pipe(
      tap((data) => console.log('New task added to Task List ! ')),
      map((data) => {
        return data;
      })
    );
  }

  /**
   * @description This function is responsible for handling any error which may occure
   * during interaction with server.
   *
   * @return Observable<never>
   */
  private handleError(err): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
