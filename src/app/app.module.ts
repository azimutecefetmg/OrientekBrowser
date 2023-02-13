import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ServiceWorkerModule} from '@angular/service-worker';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingPageComponent} from './landing-page/landing-page.component';

import {AuthModule} from './auth/auth.module';
import {OrientistaModule} from './orientista/orientista.module';
import {ClubesModule} from './clubes/clubes.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OrientistaModule,
    AuthModule,
    ClubesModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*  constructor(router: Router) {
      // Use a custom replacer to display function names in the route configs
      const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

      console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }*/
}
