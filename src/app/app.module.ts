import { InMemoryDataService } from './../mock/in-memory-data/in-memory-data.service';
import { LoginModule } from './screens/login/login.module';
import { HomeModule } from './screens/home/home.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    environment.enableMock
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          // apiBase: 'https://asksmanager-302f5.firebaseio.com',
          dataEncapsulation: false,
          delay: 500,
        })
      : [],
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'Sample NGRX Application',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
