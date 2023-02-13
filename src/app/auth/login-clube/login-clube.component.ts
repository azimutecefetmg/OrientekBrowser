import {Component, OnInit} from '@angular/core';
import {GenericUser} from '../../model/generic-user';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-clubes',
  templateUrl: './login-clube.component.html',
  styleUrls: ['./login-clube.component.css']
})
export class LoginClubeComponent implements OnInit {

  user = new GenericUser('', '');

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.loginUser(this.user);
    // TODO Adicionar loaders
  }

}
