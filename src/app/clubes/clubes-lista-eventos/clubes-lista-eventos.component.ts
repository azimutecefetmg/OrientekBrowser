import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {createRootComponent} from '@angular/core/src/render3/component';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-clubes-lista-eventos',
  templateUrl: './clubes-lista-eventos.component.html',
  styleUrls: ['./clubes-lista-eventos.component.css']
})
export class ClubesListaEventosComponent implements OnInit {

  eventos;

  constructor(private http: HttpClient,
              private database: DatabaseService) {
  }

  ngOnInit() {
    this.database.OpenInitDB().subscribe(() => {
      this.database.syncDowload().subscribe(() => this.buscaEventos()
        , () => this.buscaEventos());
    });
  }

  buscaEventos() {
    this.database.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }
}
