import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IMessageBroadcaster {
  messageType: string;
  payload: any;
}

@Injectable({
  providedIn: 'root',
})
export class AppBroadcasterService {
  private broadcasterObservable$ = new Subject<IMessageBroadcaster>();
  messageBroadcaster$ = this.broadcasterObservable$.asObservable();
  constructor() {}

  braodCastMessage(message: IMessageBroadcaster): void {
    this.broadcasterObservable$.next(message);
  }
}
