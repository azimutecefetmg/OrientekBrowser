import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-navbar-clubes',
  templateUrl: './navbar-clubes.component.html',
  styleUrls: ['./navbar-clubes.component.css']
})
export class NavbarClubesComponent implements OnInit {

  user;

  constructor(private auth: AuthService,
              private database: DatabaseService) {
  }

  ngOnInit() {
    M.AutoInit();
    if (navigator.onLine) {
      this.auth.getUser().subscribe((response: any) => {
        this.user = response;
      }, (err) => {
        console.error(err);
        this.buscaCubeOffline();
      });
    } else {
      this.buscaCubeOffline();
    }
  }

  buscaCubeOffline() {
    this.database.OpenInitDB().subscribe(() => {
      this.database.getClube().subscribe((data) => {
        console.log(data);
        this.user = data;
      });
    });
  }

  logout() {
    this.auth.logout();
  }
}
