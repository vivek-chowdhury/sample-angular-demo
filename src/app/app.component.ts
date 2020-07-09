import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SpinnerManagerService } from './core/spinner/spinner-manager.service';
import { AppBroadcasterService } from './core/services/app-broadcaster.service';
import { HeaderMenuActions } from './core/header/state/header.action';
import * as AppActions from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud';
  showSpinner = true;
  constructor(
    private store: Store<any>,
    private spinnerManager: SpinnerManagerService,
    private broadcaster: AppBroadcasterService
  ) {}

  /**
   * @description This method is invoked when Application is initialized,
   * it is responsible for subscribing to required services to listen to any changes
   * which required application attention.
   *
   */
  ngOnInit(): void {
    this.spinnerManager.showSpinner$.subscribe((value) => {
      this.showSpinner = value;
    });

    this.broadcaster.messageBroadcaster$.subscribe((message) => {
      if (message && message.messageType === HeaderMenuActions.LOGOUT_USER) {
        this.onLogoutRequestReceived();
      }
    });
  }

  /**
   * @description This method is invoked when user clicks on the Logout button from
   * the header section. It is responsible for setting store and navigating user to login
   * screen.
   */
  onLogoutRequestReceived(): void {
    this.store.dispatch(AppActions.logoutAction());
  }
}
