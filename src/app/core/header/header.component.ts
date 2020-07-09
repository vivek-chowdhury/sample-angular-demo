import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { IHeaderState, SCREENTYPES } from './state/iheader.state';
import { headerSelector } from './state/header.reducer';
import { AppBroadcasterService } from '../services/app-broadcaster.service';
import { HeaderMenuActions } from './state/header.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentActive = true;
  headerState: IHeaderState;

  constructor(
    private router: Router,
    private store: Store<IHeaderState>,
    private broadcaster: AppBroadcasterService
  ) {}

  /**
   * @description This getter is responsible for returning true if New Task option needs
   * to be displayed in the header sub menu.
   *
   * @return boolean
   */
  get isNewTaskRequired(): boolean {
    return (
      this.headerState &&
      this.headerState.screenType === SCREENTYPES.HOME_SCREEN
    );
  }

  /**
   * @description This getter is responsible for returning true if Logout option needs
   * to be displayed in the header sub menu.
   *
   * @return boolean
   */
  get isLogoutOptionRequired(): boolean {
    return (
      this.headerState &&
      this.headerState.isUserLoggedIn &&
      this.headerState.screenType !== SCREENTYPES.LOGIN_SCREEN
    );
  }

  /**
   * @description This getter is responsible for returning true if Home option needs
   * to be displayed in the header section.
   *
   * @return boolean
   */
  get isHomeMenuRequired(): boolean {
    return (
      this.headerState &&
      this.headerState.screenType !== SCREENTYPES.HOME_SCREEN &&
      this.headerState.screenType !== SCREENTYPES.LOGIN_SCREEN
    );
  }

  /**
   * @description This getter is responsible for returning true if About option needs
   * to be displayed in the header section.
   *
   * @return boolean
   */
  get isAboutMenuRequired(): boolean {
    return (
      this.headerState &&
      this.headerState.screenType !== SCREENTYPES.ABOUT_SCREEN
    );
  }

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
          this.headerState = state;
        }
      });
  }

  /**
   * @description This method is invoked when user clicks on the Add Task option
   * from the Header menu.
   */
  onAddTaskClicked(): void {
    this.broadcaster.braodCastMessage({
      messageType: HeaderMenuActions.ADD_NEW_TASK,
      payload: null,
    });
  }

  /**
   * @description This method is invoked when user clicks on the Logout option
   * from the Header menu.
   */
  onLogoutClicked(): void {
    this.broadcaster.braodCastMessage({
      messageType: HeaderMenuActions.LOGOUT_USER,
      payload: null,
    });
    this.router.navigate(['']);
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
    if (this.headerState && this.headerState.isUserLoggedIn) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['']);
    }
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
