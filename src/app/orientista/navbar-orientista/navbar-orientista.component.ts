import {Component, OnInit} from '@angular/core';
import {AuthOrientistaService} from '../../auth/auth-orientista.service';
import {AutoInit} from 'materialize-css';

@Component({
  selector: 'app-navbar-orientista',
  templateUrl: './navbar-orientista.component.html',
  styleUrls: ['./navbar-orientista.component.css']
})
export class NavbarOrientistaComponent implements OnInit {
  user;

  constructor(private auth: AuthOrientistaService) {
  }

  ngOnInit() {
    this.auth.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        const elems = document.getElementsByClassName('username-wrapper');
        for (let i = 0; i < elems.length; i++) {
          elems[i].innerHTML = this.user.nomeCorredor;
        }
      }
    });
    M.AutoInit();
  }

  logout() {
    console.log('clicou: logout');
    this.auth.logout();
  }
}
