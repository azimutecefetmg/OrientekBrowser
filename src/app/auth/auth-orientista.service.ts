import {Injectable} from '@angular/core';
import {GenericUser} from '../model/generic-user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthOrientistaService {

  public logged: boolean;
  public redirectUrl;
  tempUser: GenericUser;

  public loggedUser;

  defaultHost = 'http://localhost:80/Orientek/api';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      if (Number(localStorage.getItem('expiration')) <= Date.now()) {
        return true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
      }
    }
    return;
  }

  loginUser(user: GenericUser) {

    const req = this.http.post(this.defaultHost + '/corredor/auth.php', user);
    req.subscribe((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('Uid', response.id);
          localStorage.setItem('expiration', response.expiration);
          if (this.redirectUrl) {

            this.router.navigate([this.redirectUrl]);
          } else {
            this.router.navigate(['orientista']);
          }
        } else {
          return false;
        }
      }, (err) => {
        M.toast({html: 'Erro ao conectar ao servidor'});
        console.error(err);
      }
    );
  }

  getUser() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('Uid');
    return this.http.post(this.defaultHost + '/corredor/auth.php', {token: token, id: id});
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Uid');
    localStorage.removeItem('expiration');
    this.router.navigate(['/home']);
  }
}
