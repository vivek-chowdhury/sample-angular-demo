import { LoginScreenComponent } from './screens/login/login-screen/login-screen.component';
// import { HomeModule } from './screens/home/home/home.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginScreenComponent,
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./screens/about/about.module').then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
