import { HomeRoutingModule } from './home-routing.module';
import { TaskListComponent } from './home-screen/task-list/task-list.component';
import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home-screen/home.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HomeComponent, TaskListComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
