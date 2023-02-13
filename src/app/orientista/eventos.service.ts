import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  baseUrl: string = 'http://localhost:80/Orientek/api/corredor/eventos.php';
  queryUrl: string = '?campo=';

  constructor(private http: HttpClient) {
  }


  searchEntries(term) {
    console.log(term);
    const token = localStorage.getItem('token');
    return this.http
      .get<[]>(this.baseUrl + this.queryUrl + term,
        {
          headers: {
            'Authorization': token
          }
        });
  }
}
