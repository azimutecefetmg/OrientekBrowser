import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.css']
})
export class DetalheEventoComponent implements OnInit {

  evento;
  flag = true;
  participacoes;
  corredores;
  modal;

  selectedCorredor;
  selectedParticipacao;

  corredor = function (participacao) {
    return this.corredores.find(corredor => corredor.idCorredor = participacao.idCorredor);
  };
  pago = function (participacao) {
    if (participacao.pagoParticipacao) {
      if (Number(participacao.pagoParticipacao) !== 0) {
        return true;
      }
    }
    return false;
  };

  constructor(private route: ActivatedRoute,
              private dataBaseService: DatabaseService) {
  }

  ngOnInit() {
    this.dataBaseService.OpenInitDB().subscribe((install) => {
      this.dataBaseService.syncEventosDownload().subscribe(() => {
        this.getEvento();
      });
    });
    const elemsModal = document.querySelectorAll('.modal');
    this.modal = M.Modal.init(elemsModal, {});
  }

  getEvento() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataBaseService.getEvento(id).subscribe(evento => {
      if (!evento) {
        if (navigator.onLine && this.flag) {
          this.flag = false;
          this.dataBaseService.syncEventosDownload()
            .subscribe(
              () => this.getEvento()
              , (err) => console.error(err));
        } else {
          M.toast({html: 'Erro: evento não encontrado, certifique-se de que seu computador está conectado'});
        }
      } else {
        this.flag = true;
        this.evento = evento;
        this.dataBaseService.getParticipacoesByEvento(evento.idEvento).subscribe((data: { participacao: any, corredor: any }) => {
          this.participacoes = data.participacao;
          this.corredores = data.corredor;
        }, error => console.error(error));
      }
    }, (err) => {
      console.error(err);
      M.toast({html: 'Erro desconhecido'});
    });
  }

  select(corredor, participacao) {
    this.selectedCorredor = corredor;
    this.selectedParticipacao = participacao;

  }

}
