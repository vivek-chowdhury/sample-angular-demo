import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  IButtonAction,
  headerToggleButtonState,
} from './../../../core/header/state/header.action';
import { ILoginState } from './../state/ilogin.state';
import { IAppState } from './../../../state/iapp.state';
import { SpinnerManagerService } from './../../../core/spinner/spinner-manager.service';
import { IUserDetail } from '../state/ilogin.state';
import { loginSelector } from '../state/login.reducer';
import * as LoginActions from '../state/login.actions';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {
  loginGroup: FormGroup;
  isInvalidLogin: boolean;
  rememberMeChecked: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinnerManager: SpinnerManagerService,
    private store: Store<IAppState>
  ) {}

  /**
   * @description
   *
   */
  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    const props: IButtonAction = {
      isAddTaskVisible: false,
      isLogoutRequired: false,
    };
    this.store.dispatch(headerToggleButtonState({ button: props }));

    // TODO: Need to unsubscribe later
    this.store.select(loginSelector).subscribe((state) => {
      if (state) {
        this.rememberMeChecked = state.rememberMe;
        this.parseUserDetail(state.user);
      }
    });

    // TODO: Need to remove this timeout later
    const timeoutId = setTimeout(() => {
      this.spinnerManager.hideSpinner();
      clearTimeout(timeoutId);
    }, 10);
  }

  /**
   * @description
   *
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
      }
    }
  }

  saveUserCredentials(): void {
    const loginState: ILoginState = {
      rememberMe: this.rememberMeChecked,
      user: null,
    };
    if (this.rememberMeChecked) {
      loginState.user = { ...this.loginGroup.value };
    }
    this.store.dispatch(
      LoginActions.rememberUserCredential({ login: loginState })
    );
  }

  /**
   * @description
   *
   */
  onResetClicked(): void {
    this.isInvalidLogin = false;
    this.loginGroup.reset();
  }

  /**
   * @description
   */
  onRememberMeChanged(): void {
    this.rememberMeChecked = !this.rememberMeChecked;
    const props: ILoginState = {
      rememberMe: this.rememberMeChecked,
    };
    this.store.dispatch(
      LoginActions.toggleRememberMeCheckBox({ login: props })
    );
  }

  /**
   * @description
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
}
