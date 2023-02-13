import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrientistasComponent} from './orientistas/orientistas.component';
import {OrientistaGuard} from '../auth/orientista.guard';
import {InicioComponent} from './inicio/inicio.component';
import {BuscarEventosComponent} from './buscar-eventos/buscar-eventos.component';
import {DetalheEventoComponent} from './detalhe-evento/detalhe-evento.component';
import {InscricoesComponent} from './inscricoes/inscricoes.component';

const routes: Routes = [
  {
    path: 'orientista',
    component: OrientistasComponent,
    canActivate: [OrientistaGuard],
    children: [
      {
        path: '',
        canActivateChild: [OrientistaGuard],
        children: [
          {path: 'busca-evento', component: BuscarEventosComponent},
          {path: 'detalhe-evento/:id', component: DetalheEventoComponent},
          {path: 'participacoes', component: InscricoesComponent},
          {path: '', component: InicioComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrientistaRoutingModule {
}
