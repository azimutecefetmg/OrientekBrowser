import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClubesRoutingModule} from './clubes-routing.module';

import {NavbarClubesComponent} from './navbar-clubes/navbar-clubes.component';
import {AsideClubesComponent} from './aside-clubes/aside-clubes.component';
import {ClubesComponent} from './clubes/clubes.component';
import {HomeClubeComponent} from './home-clube/home-clube.component';
import {CadastroEventosComponent} from './cadastro-eventos/cadastro-eventos.component';
import {DetalheEventoComponent} from './detalhe-evento/detalhe-evento.component';
import {FormsModule} from '@angular/forms';
import {MainEventListComponent} from './main-event-list/main-event-list.component';
import {ClubesListaEventosComponent} from './clubes-lista-eventos/clubes-lista-eventos.component';
import {LoadingPanelComponent} from './loading-panel/loading-panel.component';
import {ValidarCorredorComponent} from './validar-corredor/validar-corredor.component';


@NgModule({
  declarations: [
    ClubesComponent,
    HomeClubeComponent,
    CadastroEventosComponent,
    DetalheEventoComponent,
    NavbarClubesComponent,
    AsideClubesComponent,
    MainEventListComponent,
    ClubesListaEventosComponent,
    LoadingPanelComponent,
    ValidarCorredorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClubesRoutingModule,
  ]
})
export class ClubesModule {
}
