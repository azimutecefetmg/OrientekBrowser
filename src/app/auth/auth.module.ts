import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginClubeComponent} from './login-clube/login-clube.component';
import {FormsModule} from '@angular/forms';
import { LoginOrientistaComponent } from './login-orientista/login-orientista.component';
import { SignOrientistaComponent } from './sign-orientista/sign-orientista.component';
import { SignUpClubeComponent } from './sign-up-clube/sign-up-clube.component';
import {AuthComponent} from './auth/auth.component';

@NgModule({
    declarations: [LoginClubeComponent, LoginOrientistaComponent, SignOrientistaComponent, SignUpClubeComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
