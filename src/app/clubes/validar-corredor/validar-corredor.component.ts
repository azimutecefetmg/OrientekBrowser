import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-validar-corredor',
  templateUrl: './validar-corredor.component.html',
  styleUrls: ['./validar-corredor.component.css']
})
export class ValidarCorredorComponent implements OnInit {

  @Input() participacao;
  _corredor;
  @Input()
  set corredor(corredor) {
    this._corredor = corredor;
    this.initMaterialbox();
  }

  materialBox;

  defaultHost = 'http://localhost:80/Orientek';

  constructor(private http: HttpClient,
              private database: DatabaseService) {
  }

  ngOnInit() {
  }

  initMaterialbox() {
    const elems = document.getElementById('comprovante-expande');
    setTimeout(() => this.materialBox = M.Materialbox.init(elems, {}), 100);
  }

  validar() {
    this.participacao.pagoParticipacao = 1;
    console.log(this.participacao);
    const token = localStorage.getItem('authToken');
    this.http.put(this.defaultHost + '/api/clube/eventos.php', {participacao: this.participacao.idParticipa}, {
      headers: {
        'Authorization': token
      }
    }).subscribe(() => {
      M.toast({html: 'Inscricao aprovada'});
    }, (error) => {
      console.error(error);
    });
    this.database.OpenInitDB().subscribe(() => {
      this.database.insertParticipacao(this.participacao);
    });
  }

}
