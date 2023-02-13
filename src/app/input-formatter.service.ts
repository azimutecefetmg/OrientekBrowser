import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputFormatterService {

  constructor() {
  }

  formataCep(evento: any) {
    let val = evento.target.value.replace(/\D/, '');
    /* if (val.length > 8) {
        this.buscaCEP(val);
     }*/
    val = val.replace(/(\d{5})(\d{1,3})/g, '$1-$2');
    evento.target.value = val;
  }

  formataDinheiro(evento) {
    evento.target.value = evento.target.value
      .replace(/\D/, '')
      .replace(/(\d)(\d{2}$)/g, '$1,$2');
  }

  formataHora(evento) {
    evento.target.value = evento.target.value
      .replace(/\D/, '')
      .replace(/(\d)(\d{2}$)/g, '$1:$2');
  }

  formataCPF(evento: any) {
    evento.target.value = evento.target.value
      .replace(/\D/, '')
      .replace(/(^\d{3})(\d)/g, '$1.$2')
      .replace(/(^\d{3}\.\d{3})(\d)/g, '$1.$2')
      .replace(/(^\d{3}\.\d{3}\.\d{3})(\d)/g, '$1-$2');
  }

  formataTelefone(evento: any) {
    evento.target.value = evento.target.value.replace(/\D/, '')
      .replace(/\D/g, '')
      .replace(/(^\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  }

// XX.XXX.XXX/XXXX-XX
  formataCNPJ(evento: any) {
    evento.target.value = evento.target.value
      .replace(/\D/, '')
      .replace(/(^\d{2})(\d)/g, '$1.$2')
      .replace(/(^\d{2}\.\d{3})(\d)/g, '$1.$2')
      .replace(/(^\d{2}\.\d{3}\.\d{3})(\d)/g, '$1/$2')
      .replace(/(^\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/g, '$1-$2');
  }

  somenteNumeros(evento) {
    evento.target.value = evento.target.value.replace(/(\D)/, '');
  }

  formataData(evento: any) {
    evento.target.value = evento.target.value
      .replace(/\D/, '')
      .replace(/(^\d{2})(\d)/g, '$1/$2')
      .replace(/(^\d{2}\/\d{2})(\d{1,4})/g, '$1/$2');
  }

}
