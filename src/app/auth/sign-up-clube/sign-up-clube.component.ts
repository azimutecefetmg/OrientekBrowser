import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {InputFormatterService} from '../../input-formatter.service';

@Component({
  selector: 'app-sign-up-clube',
  templateUrl: './sign-up-clube.component.html',
  styleUrls: ['./sign-up-clube.component.css']
})
export class SignUpClubeComponent implements OnInit {

  estados;
  cidades;
  enviando = false;
  defaultHost = 'http://localhost:80/Orientek';

  // defaultHost='http://localhost:80/Orientek';

  constructor(private http: HttpClient,
              private router: Router,
              public formatter: InputFormatterService) {
  }

  ngOnInit() {
    this.buscaEstados();
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

  submit() {
    const formElem = <HTMLFormElement>document.getElementById('form-cadastro');
    const data = new FormData(formElem);
    this.enviando = true;
    this.http.post(this.defaultHost + '/api/clube/signUp.php', data).subscribe(
      (response: any) => {
        if (!response.success) {
          M.toast({html: response.data});
        } else {
          M.toast({html: 'Cadastro executado com sucesso.'});
          this.router.navigate(['auth/clube/login']);
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
