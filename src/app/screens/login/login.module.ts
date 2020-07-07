import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';

import { StoreModule } from '@ngrx/store';
import { loginReducer } from './state/login.reducer';

@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('login', loginReducer),
  ],
})
export class LoginModule {}
