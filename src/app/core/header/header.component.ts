import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { IHeaderState } from './state/iheader.state';
import { headerSelector } from './state/header.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAddTaskOptionRequired: boolean;
  isLogoutRequired: boolean;
  componentActive = true;

  constructor(private router: Router, private store: Store<IHeaderState>) {}

  /**
   * @description This method is invoked when component is intialized, it is
   * responsible for subscrbing store to listen to any changes.
   */
  ngOnInit(): void {
    this.store
      .pipe(
        select(headerSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          this.isAddTaskOptionRequired = state.homeOptions.isAddTaskVisible;
          this.isLogoutRequired = state.logout.isVisible;
        }
      });
  }

  /**
   * @description This method is invoked when user clicks on the Add Task option
   * from the Header menu.
   */
  onAddTaskClicked(): void {
    alert(
      'Right now this functionality is not working but Will implement later, So stay tune !'
    );
  }

  /**
   * @description This method is invoked when user clicks on the About button
   * from the Header. It is responsible for navigating user to About screen.
   */
  onAboutClicked(): void {
    this.router.navigate(['/about']);
  }

  /**
   * @description This method is invoked when user clicks on the Home button
   * from the Header. It is responsible for navigating user to Home screen i.e.
   * if user is not logged in that user will be moved to Login screen else user will
   * navigate to Home screen.
   */
  onHomeClicked(): void {
    this.router.navigate(['']);
  }

  /**
   * @description This method will invoked when component is removed from the display list,
   * it is responsible for setting member variable to true which will further unsubscibe any
   * subscription to store.
   */
  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
