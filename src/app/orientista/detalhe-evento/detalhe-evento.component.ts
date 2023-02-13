import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.css']
})
export class DetalheEventoComponent implements OnInit {

  defaultHost = 'http://localhost:80/Orientek';

  // defaultHost='http://localhost:80/Orientek';

  queryUrl = this.defaultHost + '/api/corredor/eventos.php?id=';
  evento;

  constructor(private activeRoute: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.activeRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.getClube(params))
    ).subscribe(evento => {
      console.log(evento);
      this.evento = evento;
    });
  }

  getClube(params: ParamMap) {
    const token = localStorage.getItem('token');
    return this.http.get(this.queryUrl + params.get('id'), {
      headers: {
        'Authorization': token
      }
    });
  }

  inscricao() {
    console.log('inscrição');
    if (!this.evento.inscrito) {
      const uid = localStorage.getItem('Uid');
      const token = localStorage.getItem('token');
      this.http.post(this.defaultHost + '/api/corredor/eventos.php', {evento: this.evento.idEvento}, {
        headers: {
          'Authorization': token
        }
      }).subscribe((data: any) => {
        this.evento.inscrito = data.ok;
        if (!data.ok) {
          M.toast({html: '<span class="red-text">Erro:</span>'});
        }
      });
    }
  }
}
