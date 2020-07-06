import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerManagerService {
  showSpinner$ = new Subject<boolean>();

  constructor() {}

  /**
   * @description
   *
   */
  showSpinner(): void {
    this.showSpinner$.next(true);
  }

  /**
   * @description
   */
  hideSpinner(): void {
    this.showSpinner$.next(false);
  }
}
