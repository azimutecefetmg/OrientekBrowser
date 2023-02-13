import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-inscricoes',
  templateUrl: './inscricoes.component.html',
  styleUrls: ['./inscricoes.component.css']
})
export class InscricoesComponent implements OnInit {

  eventos;
  selectedEvento;
  defaultHost = 'http://localhost:80/Orientek';

  // defaultHost='http://localhost:80/Orientek';
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.http.get(this.defaultHost + '/api/corredor/eventos.php', {
      headers: {
        'Authorization': token
      }
    }).subscribe((res: any) => {
      this.eventos = res;
      console.log(this.eventos);
    });
  }

  selectEvento(evento) {
    this.selectedEvento = evento;
  }
}
