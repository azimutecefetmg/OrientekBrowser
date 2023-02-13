import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginClubeComponent} from './login-clube/login-clube.component';
import {LoginOrientistaComponent} from './login-orientista/login-orientista.component';
import {SignOrientistaComponent} from './sign-orientista/sign-orientista.component';
import {SignUpClubeComponent} from './sign-up-clube/sign-up-clube.component';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [{
    path: 'auth',
    component: AuthComponent,
    children: [
        {path: 'clube/login', component: LoginClubeComponent},
        {path: 'clube/cadastro', component: SignUpClubeComponent},
        {path: 'orientista/login', component: LoginOrientistaComponent},
        {path: 'orientista/cadastro', component: SignOrientistaComponent},
        {path: '', redirectTo: '/orientista/login', pathMatch: 'full'}
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
