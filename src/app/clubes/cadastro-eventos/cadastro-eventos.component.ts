import {Component, OnInit} from '@angular/core';
import {InputFormatterService} from '../../input-formatter.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-eventos',
  templateUrl: './cadastro-eventos.component.html',
  styleUrls: ['./cadastro-eventos.component.css']
})
export class CadastroEventosComponent implements OnInit {

  estados;
  cidades;
  enviando: boolean;

  defaultHost = 'http://localhost:80/Orientek';

  // defaultHost='http://localhost:80/Orientek';

  constructor(public formatter: InputFormatterService,
              private http: HttpClient,
              private router: Router) {
  }

  buscaEstados() {
    this.http.get(this.defaultHost + '/api/buscaEstados.php').subscribe(
      (data: []) => {
        this.estados = data;
        setTimeout(() => {
          M.AutoInit();
          this.buscaCidade();
        }, 400);
      }
    );
  }

  buscaCidade() {
    const estado: any = document.getElementById('estado');
    this.http.get(this.defaultHost + '/api/buscaCidade.php?estado=' + estado.value).subscribe(
      (data) => {
        this.cidades = data;
        setTimeout(() => {
          M.AutoInit();
        }, 500);
      }
    );
  }

  ngOnInit() {
    M.AutoInit();
    this.buscaEstados();
  }

  submit() {
    const formElem = <HTMLFormElement>document.getElementById('cad-eventos');
    const data = new FormData(formElem);
    this.enviando = true;
    this.http.post(this.defaultHost + '/api/clube/eventos.php', data).subscribe(
      (response: any) => {
        if (!response.success) {
          M.toast({html: response.data});
        } else {
          M.toast({html: 'Cadastro executado com sucesso.'});
          this.router.navigate(['clube/eventos']);
        }
        console.log(response);
        this.enviando = false;
      }, (error) => {
        console.log(error);
        this.enviando = false;
        M.toast({html: '<span class="red-text">Erro</span>'});
      }
    );
  }

}
