import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token} from '../model/token';
import {GenericUser} from '../model/generic-user';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  tempUser: GenericUser;

  redirectUrl: string;

  logged: boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.logged = this.isAuthenticaded('');
  }

  public isAuthenticaded(url): boolean {
    console.log('%cbaum', 'font-size:2rem; font-weight:900');
    if (localStorage.getItem('authToken')) {
      if (Number(localStorage.getItem('tokenExpiration')) > Date.now()) {
        console.log('%ctrue', 'color:green');
        return true;
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        this.redirectUrl = url;
        console.log('%cfalse', 'color:red');
        return false;
      }
    }
    console.log('%cfalse - sem token', 'color:red');
    return false;
  }

  public loginUser(user: GenericUser) {
    return this.http.post<Token>('http://localhost:80/Orientek/auth.php', user)
      .subscribe((response: any) => {
        if (response.token) {
          console.log(response);
          localStorage.setItem('CId', response.id);
          localStorage.setItem('authToken', response.token);
          const time = Date.now() + 1000 * 60 * 60 * 24 * 15;
          localStorage.setItem('tokenExpiration', time.toString());
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          } else {
            this.router.navigate(['clube']);
          }
          return true;
        } else {
          return false;
        }
      }, (error1) => {
        if (navigator.onLine) {
          M.toast({html: 'Erro ao conectar ao servidor'});
        } else {
          M.toast({html: 'Erro ao conectar, você está offline'});
        }
        console.log(error1);
      });
  }

  public getUser() {
    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('CId');
    return this.http.post('http://localhost:80/Orientek/auth.php', {token: token, id: id});
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('CId');
    this.router.navigate(['home']);
  }
}
