import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutScreenComponent } from './about-screen/about-screen.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutScreenComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
