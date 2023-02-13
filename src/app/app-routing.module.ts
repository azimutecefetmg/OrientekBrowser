import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {AuthClubesGuard} from './auth/auth-clubes.guard';
import {OrientistaGuard} from './auth/orientista.guard';

const routes: Routes = [

  {path: 'home', component: LandingPageComponent},
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'clube',
    loadChildren: './clubes/clubes.module#ClubesModule',
    canLoad: [AuthClubesGuard]
  },
  {
    path: 'orientista',
    loadChildren: './orientista/orientista.module#OrientistaModule',
    canLoad: [OrientistaGuard]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, /*{enableTracing: true}*/)]
})
export class AppRoutingModule {
}
