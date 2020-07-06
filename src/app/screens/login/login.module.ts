import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';

@NgModule({
  declarations: [LoginScreenComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class LoginModule {}
