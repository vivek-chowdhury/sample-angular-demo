import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, SharedModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class CoreModule {}
