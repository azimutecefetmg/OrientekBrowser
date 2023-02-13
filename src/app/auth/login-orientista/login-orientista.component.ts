import {Component, OnInit} from '@angular/core';
import {GenericUser} from '../../model/generic-user';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AuthOrientistaService} from '../auth-orientista.service';

@Component({
  selector: 'app-login-orientista',
  templateUrl: './login-orientista.component.html',
  styleUrls: ['./login-orientista.component.css']
})
export class LoginOrientistaComponent implements OnInit {

  user = new GenericUser('', '');

  constructor(
    private router: Router,
    private auth: AuthOrientistaService
  ) {
  }

  ngOnInit() {
  }

  signIn() {
    this.auth.tempUser = this.user;
    this.router.navigate(['/siginup']);
  }

  login() {
    this.auth.loginUser(this.user);
    // TODO Adicionar loaders
  }

}
