import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-enviar-comprovante',
  templateUrl: './enviar-comprovante.component.html',
  styleUrls: ['./enviar-comprovante.component.css']
})
export class EnviarComprovanteComponent implements OnInit {

  @Input() evento;
  imagem;
  submete = false;
  modal;
  defaultHost = 'http://localhost:80/Orientek';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    M.AutoInit();
    const modalElem = document.getElementById('modal1');
    this.modal = M.Modal.getInstance(modalElem);
  }

  showFile(ev: any) {
    const reader = new FileReader();
    reader.onload = function () {
      const output: any = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(ev.target.files[0]);
    this.imagem = ev.target.files[0];
  }

  sendFile() {
    const token = localStorage.getItem('token');
    const formData: FormData = new FormData();
    formData.append('file', this.imagem, this.imagem.name);
    formData.append('evento', this.evento.idEvento);
    this.http.post(this.defaultHost + '/api/corredor/eventos.php', formData, {
      headers: {
        'Authorization': token
      }, responseType: 'text'
    }).subscribe((response: any) => {
      if (response.ok) {
        console.log('sla');
        M.toast({html: 'Comprovante enviado'});
        this.modal.close();
      }
    }, error => {
      console.error(error);
    });
  }

}
