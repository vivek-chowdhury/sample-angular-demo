import { LoginModule } from './screens/login/login.module';
import { HomeModule } from './screens/home/home.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './screens/home/home-screen/home.component';
// import { TaskListComponent } from './screens/home/home-screen/task-list/task-list.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HomeModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
