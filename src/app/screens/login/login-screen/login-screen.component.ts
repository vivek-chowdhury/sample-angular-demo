import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

import * as HeaderActions from './../../../core/header/state/header.action';
import { ILoginState } from './../state/ilogin.state';
import { IAppState, IUserDetail } from './../../../state/iapp.state';
import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';
import { loginSelector } from '../state/login.reducer';
import * as LoginActions from '../state/login.actions';
import { SCREENTYPES } from 'src/app/core/header/state/iheader.state';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  loginGroup: FormGroup;
  isInvalidLogin: boolean;
  rememberMeChecked: boolean;
  componentActive = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinnerManager: SpinnerManagerService,
    private store: Store<IAppState>
  ) {}

  /**
   * @description This method will invoke when Component is initialized, it is
   * responsible for initialing form group and other member variables.
   */
  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Approach 1: To test this uncomment approach 2 from reducer and then uncomment this
    // this.store.dispatch(
    //   HeaderActions.headerToggleButtonState({
    //     button: { isUserLoggedIn: false, screenType: SCREENTYPES.LOGIN_SCREEN },
    //   })
    // );

    // Approach 2
    this.store.dispatch(
      new HeaderActions.HeaderToggleButtonState({
        isUserLoggedIn: false,
        screenType: SCREENTYPES.LOGIN_SCREEN,
      })
    );

    this.registerStore();

    // TODO: Need to remove this timeout later
    const timeoutId = setTimeout(() => {
      this.spinnerManager.hideSpinner();
      clearTimeout(timeoutId);
    }, 10);
  }

  /**
   * @description This method is responsible for subscrbing store and listening to any changes
   *  in Login state.
   */
  registerStore(): void {
    this.store
      .pipe(
        select(loginSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          this.rememberMeChecked = state.rememberMe;
          this.parseUserDetail(state.user);
        }
      });
  }

  /**
   * @description This method will invoke, when user clicks on the Login button.
   * It is responsible for validating user and if user is admin then it will allow user
   * to enter Home screen.
   */
  onLoginClicked(): void {
    if (this.loginGroup.valid) {
      this.spinnerManager.showSpinner();
      const user = this.loginGroup.value;
      if (user.userName === 'admin' && user.password === 'admin') {
        this.saveUserCredentials();
        this.router.navigate(['/home']);
      } else {
        this.isInvalidLogin = true;
        this.spinnerManager.hideSpinner();
      }
    }
  }

  /**
   * @description This method is responsible for saving user credention in store if
   * 'Remember me' check box is checked.
   */
  saveUserCredentials(): void {
    const loginState: ILoginState = {
      rememberMe: this.rememberMeChecked,
      user: null,
    };
    if (this.rememberMeChecked) {
      loginState.user = { ...this.loginGroup.value };
    }
    // Approach 1: To test this uncomment approach 2 from reducer and then uncomment this
    // this.store.dispatch(
    //   LoginActions.rememberUserCredential({ login: loginState })
    // );

    // Approach 2
    this.store.dispatch(new LoginActions.RememberUserCredential(loginState));
  }

  /**
   * @description This method is invoked when user clicks on the Reset button. It is
   * responsible for resetting form to initial state.
   *
   */
  onResetClicked(): void {
    this.isInvalidLogin = false;
    this.loginGroup.reset();
  }

  /**
   * @description This method is invoked when user clicks on the Remember me check box.
   * It is responsible for saving state to Store and in member variable.
   */
  onRememberMeChanged(): void {
    this.rememberMeChecked = !this.rememberMeChecked;

    // Approach 1: To test this uncomment approach 2 from reducer and then uncomment this
    // const props: ILoginState = {
    // rememberMe: this.rememberMeChecked,
    // };
    // this.store.dispatch(
    //   LoginActions.toggleRememberMeCheckBox({ login: props })
    // );

    // Approach 2
    this.store.dispatch(
      new LoginActions.ToggleRememberMe(this.rememberMeChecked)
    );
  }

  /**
   * @description This method is invoked when user return to the login screen and as
   * per setting application needs to prepopulate login form with pervious values.
   *
   */
  parseUserDetail(user: IUserDetail): void {
    if (user) {
      this.loginGroup.patchValue({
        userName: user.userName,
        password: user.password,
      });
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
