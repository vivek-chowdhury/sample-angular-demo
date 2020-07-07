import { StoreModule } from '@ngrx/store';
import { HomeRoutingModule } from './home-routing.module';
import { TaskListComponent } from './home-screen/task-list/task-list.component';
import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home-screen/home.component';
import { NgModule } from '@angular/core';
import { homeReducer } from './state/home.reducer';

@NgModule({
  declarations: [HomeComponent, TaskListComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature('home', homeReducer),
  ],
})
export class HomeModule {}
