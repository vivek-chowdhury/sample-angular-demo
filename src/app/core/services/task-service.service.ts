import { environment } from './../../../environments/environment.prod';
import { ITask } from './interfaces/itask.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public getTaskList(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Task.json`).pipe(
      tap((data) =>
        console.log('Task List fetched from server successfully !')
      ),
      map((data) => {
        return this.parseTaskList(data);
      }),
      catchError(this.handleError)
    );
  }

  parseTaskList(data): ITask[] {
    const list: ITask[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'null' && data[key] && data[key] instanceof Object) {
        data[key].key = key;
        list.push(data[key]);
      }
    }
    return list;
  }

  public insertTask(task: ITask): Observable<any> {
    const o = { ...task };
    delete o.key;
    return this.http.post<any>(`${environment.baseUrl}/Task.json`, o).pipe(
      tap((data) => console.log('New task added to Task List ! ')),
      mergeMap((data) => {
        return this.getTaskList();
      })
    );
  }

  public updateTask(task: ITask): Observable<any> {
    const o = { ...task };
    const name = o.key;
    delete o.key;
    const url = `${environment.baseUrl}/Task/${name}.json`;
    return this.http.put<any>(url, o).pipe(
      tap((data) => console.log('New task added to Task List ! ')),
      mergeMap((data) => {
        return this.getTaskList();
      })
    );
  }

  public deleteTask(task: ITask): Observable<any> {
    const name = task.key;
    const url = `${environment.baseUrl}/Task/${name}.json`;
    return this.http.delete<any>(url).pipe(
      tap((data) => console.log('New task added to Task List ! ')),
      mergeMap((data) => {
        return this.getTaskList();
      })
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
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
