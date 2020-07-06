import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {
  loginGroup: FormGroup;
  isInvalidLogin: boolean;

  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * @description
   *
   */
  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * @description
   *
   */
  onLoginClicked(): void {
    console.log(this.loginGroup.value);
    if (this.loginGroup.valid) {
      const user = this.loginGroup.value;
      if (user.userName === 'admin' && user.password === 'admin') {
        this.router.navigate(['/home']);
      } else {
        this.isInvalidLogin = true;
      }
    }
  }

  onResetClicked(): void {
    this.isInvalidLogin = false;
    this.loginGroup.reset();
  }
}
