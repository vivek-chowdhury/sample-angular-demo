import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerManagerService {
  showSpinner$ = new Subject<boolean>();
  hideSpinnerTimeoutId;
  showSpinnerTimeoutId;

  constructor() {}

  /**
   * @description This function is responsible for displaying spinner after 10 milit seconds.
   * Here we are giving angular relief of 10 mili seconds so that Angular can display
   * our spinner after executing life cycle
   *
   */
  showSpinner(): void {
    clearTimeout(this.showSpinnerTimeoutId);
    this.showSpinnerTimeoutId = setTimeout(() => {
      clearTimeout(this.showSpinnerTimeoutId);
      this.showSpinner$.next(true);
    }, 10);
  }

  /**
   * @description This function is responsible for hidding spinner after 10 milit seconds.
   * Here we are giving angular relief of 10 mili seconds so that Angular can display
   * our spinner after executing life cycle
   */
  hideSpinner(): void {
    clearTimeout(this.hideSpinnerTimeoutId);
    this.hideSpinnerTimeoutId = setTimeout(() => {
      clearTimeout(this.hideSpinnerTimeoutId);
      this.showSpinner$.next(false);
    }, 10);
  }
}
