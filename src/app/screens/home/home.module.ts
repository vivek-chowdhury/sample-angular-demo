import { DialogBoxComponent } from './home-screen/dialog-box/dialog-box.component';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../shared/shared.module';

import { HomeEffects } from './state/home.effects';
import { HomeRoutingModule } from './home-routing.module';
import { TaskListComponent } from './home-screen/task-list/task-list.component';
import { HomeComponent } from './home-screen/home.component';
import { homeReducer } from './state/home.reducer';

@NgModule({
  declarations: [HomeComponent, TaskListComponent, DialogBoxComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  entryComponents: [DialogBoxComponent],
})
export class HomeModule {}
