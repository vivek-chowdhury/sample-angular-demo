import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IHeaderState,
  SCREENTYPES,
} from './../../../core/header/state/iheader.state';
import * as HeaderActions from './../../../core/header/state/header.action';

@Component({
  selector: 'app-about-screen',
  templateUrl: './about-screen.component.html',
  styleUrls: ['./about-screen.component.scss'],
})
export class AboutScreenComponent implements OnInit {
  constructor(
    private store: Store<IHeaderState>,
    private spinnerManager: SpinnerManagerService
  ) {}

  /**
   * @description This method is inovked when Component is initialised, it is
   *  responsible for dispatching store about the current scren type and setting
   * member variables if any
   */
  ngOnInit(): void {
    this.store.dispatch(
      HeaderActions.headerToggleButtonState({
        button: { screenType: SCREENTYPES.ABOUT_SCREEN },
      })
    );
    this.spinnerManager.hideSpinner();
  }
}
