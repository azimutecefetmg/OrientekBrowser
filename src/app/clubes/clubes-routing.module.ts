import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeClubeComponent} from './home-clube/home-clube.component';
import {CadastroEventosComponent} from './cadastro-eventos/cadastro-eventos.component';
import {DetalheEventoComponent} from './detalhe-evento/detalhe-evento.component';
import {MainEventListComponent} from './main-event-list/main-event-list.component';

import {AuthClubesGuard} from '../auth/auth-clubes.guard';
import {ClubesListaEventosComponent} from './clubes-lista-eventos/clubes-lista-eventos.component';

const routes: Routes = [{
  path: 'clube',
  component: HomeClubeComponent,
  canActivate: [AuthClubesGuard],
  children: [{
    path: '',
    canActivateChild: [AuthClubesGuard],
    children:
      [
        {path: 'cadastro-eventos', component: CadastroEventosComponent},
        {path: 'detalhe-evento/:id', component: DetalheEventoComponent},
        {path: 'eventos', component: ClubesListaEventosComponent},
        {path: '', component: MainEventListComponent},
      ]
  }]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubesRoutingModule {
}
