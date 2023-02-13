import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {InputFormatterService} from '../../input-formatter.service';

@Component({
  selector: 'app-sign-orientista',
  templateUrl: './sign-orientista.component.html',
  styleUrls: ['./sign-orientista.component.css']
})
export class SignOrientistaComponent implements OnInit {

  estados;
  cidades;
  clubes;
  enviando = false;

  defaultHost = 'http://localhost:80/Orientek';

  // defaultHost='http://localhost:80/Orientek';
  constructor(private http: HttpClient,
              private router: Router,
              public formatter: InputFormatterService) {
  }

  ngOnInit() {
    M.AutoInit();
    this.buscaEstados();
    this.buscaClubes();
  }

  submit() {
    const formElem = <HTMLFormElement>document.getElementById('form-cadastro');
    const data = new FormData(formElem);
    this.enviando = true;
    this.http.post(this.defaultHost + '/api/corredor/signUp.php', data).subscribe(
      (response: any) => {
        if (!response.success) {
          M.toast({html: response.data});
        } else {
          M.toast({html: 'Cadastro executado com sucesso.'});
          this.router.navigate(['auth/orientista/login']);
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

  /*  selecionaCiade(id) {
      for (let i = 0; i < this.cidades.length; i++) {
        if (this.cidades[i].nomeCidade.match(id)) {
          const elem: any = document.getElementById('cidade');
          elem.value = this.cidades[i].idCidade;
        }
      }
    }*/

  buscaClubes() {
    this.http.get(this.defaultHost + '/api/buscaClubes.php').subscribe(
      (data: []) => {
        this.clubes = data;
        setTimeout(() => {
          M.AutoInit();
        }, 400);

      });
  }

  /*

    buscaCEP(cep) {
      this.http.get('viacep.com.br/ws/' + cep + '/json/ ')
        .subscribe(
          () => {
            this.buscaEstados();
          }
          , (err) => {
            console.log(err);
          });
    }
  */
}
