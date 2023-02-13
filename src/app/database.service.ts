import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbName = 'sistema_oriente';

  defaultHost = 'http://localhost:80/Orientek';

  // defaultHost='http://localhost:80/Orientek';

  private IndxDb: IDBFactory;

  db: IDBDatabase;

  public onDB: void;


  onError(err) {
    console.error(err);
  }

  //TODO Implementar cadastro temporário de corredores


  public getEventos(): Observable<any> {
    return new Observable(subscriber => {

      const objectStore = this.db.transaction(['evento'], 'readwrite').objectStore('evento');

      const req = objectStore.getAll();
      req.onsuccess = () => {
        subscriber.next(req.result);
      };
      req.onerror = ev => {
        console.error(ev);
      };
    });
  }

  public getEvento(id): Observable<any> {
    return new Observable(subscriber => {
      const eventosObjectStore = this.db.transaction(['evento'], 'readwrite').objectStore('evento');
      eventosObjectStore.openCursor().onsuccess = (event) => {
        // @ts-ignore
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.idEvento == id) {
            subscriber.next(cursor.value);
            return;
          } else {
            cursor.continue();
          }
        } else {
          subscriber.error(null);
        }

      };
    });
  }

  onChangeError(err) {
    console.error(err);
  }


  insertClube(clube) {
    const objStore = this.db.transaction(['clube'], 'readwrite').objectStore('clube');
    const req = objStore.get(clube.idClube);
    req.onsuccess = (ev) => {
      const data = req.result;
      let changeReq;
      if (data) {
        changeReq = objStore.put(clube);
      } else {
        changeReq = objStore.add(clube);
      }
      changeReq.onerror = this.onChangeError;
    };
  }

  public insertClubes(clube: any) {
    if (clube.length) {
      for (let i = 0; i < clube.length; i++) {
        this.insertClube(clube[i]);
      }
    } else if (clube) {
      this.insertClube(clube);
    }
  }

  insertCorredor(corredor) {
    if (corredor.idCorredor) {
      const objStore = this.db.transaction(['corredor'], 'readwrite').objectStore('corredor');
      const req = objStore.get(corredor.idCorredor);
      req.onsuccess = (ev) => {
        const data = req.result;
        let changeReq;
        if (data) {
          changeReq = objStore.put(corredor);
        } else {
          changeReq = objStore.add(corredor);
        }
        changeReq.onerror = this.onChangeError;
      };
    }
  }


  public insertCorredores(corredor) {
    if (corredor) {
      if (corredor.length > 0) {
        for (let i = 0; i < corredor.length; i++) {
          this.insertCorredor(corredor[i]);
        }
      } else {
        this.insertCorredor(corredor);
      }
    }
  }

  insertEvento(evento) {
    const objStore = this.db.transaction(['evento'], 'readwrite').objectStore('evento');
    const req = objStore.get(evento.idEvento);
    req.onsuccess = (ev) => {
      const data = req.result;
      let changeReq;
      if (data) {
        changeReq = objStore.put(evento);
      } else {
        changeReq = objStore.add(evento);
      }
      changeReq.onerror = this.onChangeError;
    };
  }

  insertParticipacao(data) {
    const objStore = this.db.transaction(['participacao'], 'readwrite').objectStore('participacao');
    const leitura = objStore.get(data.idParticipa);
    leitura.onsuccess = (ev: any) => {
      objStore.put(data).onerror = this.onChangeError;
    };
  }


  insertParticipacoes(data) {
    if (!data) {
      return;
    }
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        this.insertParticipacao(data[i]);
      }
    } else {
      this.insertParticipacao(data);
    }
  }

  getParticipacoesByEvento(id) {
    const token = localStorage.getItem('authToken');
    return new Observable(subscriber => {
      if (navigator.onLine) {
        this.http.get(this.defaultHost + '/api/clube/eventos.php?participacoes=1&id=' + id,
          {
            headers: {
              'Authorization': token
            }
          })
          .subscribe((response: any) => {
              this.insertParticipacoes(response.participacao);
              this.insertCorredores(response.corredor);
              subscriber.next(response);
              // return response;
            },
          );
      } else {
        const transaction = this.db.transaction(['participacao', 'corredor'], 'readonly');
        const objectStore = transaction.objectStore('participacao');
        const eventoIndex = objectStore.index('idEvento');
        const corredoresObjectStore = transaction.objectStore('corredor');
        const response = {
          corredor: [],
          participacao: [],
        };
        const getReq = eventoIndex.getAll(IDBKeyRange.only(id));
        getReq.onsuccess = (ev) => {
          response.participacao = getReq.result;
          for (let i = 0; i < getReq.result.length; i++) {
            const req = corredoresObjectStore.getAll();
            req.onsuccess = () => {
              response.corredor = req.result;
              subscriber.next(response);
            };
            req.onerror = e => {
              this.onError(e);
              subscriber.error();
            };
          }
          // subscriber.next(getReq.result);
        };
        getReq.onerror = (ev) => {
          console.error(ev);
          subscriber.error(ev);
        };
      }

    });
  }


  syncEventosDownload(): Observable<any> {
    return new Observable(subscriber => {
      const token = localStorage.getItem('authToken');
      this.http.get(this.defaultHost + '/api/clube/eventos.php', {
        headers: {
          'Authorization': token
        }
      }).subscribe((response: []) => {
        const objStore = this.db.transaction(['evento'], 'readwrite').objectStore('evento');
        objStore.clear().onsuccess = () => {
          this.insertEventos(response);
          subscriber.next();
        };
      });
    });
  }

  insertEventos(eventos) {
    if (!eventos) {
      return;
    }
    if (eventos.length) {
      for (let i = 0; i < eventos.length; i++) {
        this.insertEvento(eventos[i]);
      }
    } else {
      this.insertEvento(eventos);
    }
  }

  syncDowload() {
    return new Observable(subscriber => {
      const token = localStorage.getItem('authToken');
      this.http.get(this.defaultHost + '/upload.php', {
        headers: {
          'Authorization': token
        }
      })
        .subscribe((data: any) => {
            this.insertClubes(data.clube);
            this.insertCorredores(data.corredor);
            this.insertEventos(data.evento);
            this.insertParticipacoes(data.participacao);
            const syncObjectStore = this.db.transaction(['sync'], 'readwrite').objectStore('sync');
            const id = localStorage.getItem('CId');
            const time = Date();
            syncObjectStore.add({
              token: token,
              userId: id,
              time: time,
              type: 'Download',
              status: 'ok'
            });
            subscriber.next();
          }, error => {
            console.error(error);
            subscriber.error(error);
          }
        );
    });
  }

  getClube(): Observable<any> {
    return new Observable(subscriber => {
      const eventosObjectStore = this.db.transaction(['clube'], 'readwrite').objectStore('clube');
      eventosObjectStore.openCursor().onsuccess = (event) => {
        // @ts-ignore
        const cursor = event.target.result;
        if (cursor) {
          subscriber.next(cursor.value);
          return;
        } else {
          subscriber.error(null);
        }

      };
    });
  }

  public OpenInitDB() {
    return new Observable((subscriber => {
      let idbOpenDBRequest: IDBOpenDBRequest;
      idbOpenDBRequest = this.IndxDb.open(this.dbName, 2);
      idbOpenDBRequest.onupgradeneeded = (e) => {
        const db = idbOpenDBRequest.result;
        db.onerror = (err) => {
          console.error(err);
          throw err;
        };
        const corredoresObjectStore = db.createObjectStore('corredor', {keyPath: 'idCorredor'});
        corredoresObjectStore.createIndex('loginCorredor', 'loginCorredor');
        corredoresObjectStore.createIndex('categoriaCorredor', 'categoriaCorredor');
        corredoresObjectStore.createIndex('sexoCorredor', 'sexoCorredor');
        corredoresObjectStore.createIndex('nomeCorredor', 'nomeCorredor');
        corredoresObjectStore.createIndex('CPFCorredor', 'CPFCorredor');
        corredoresObjectStore.createIndex('numCorredor', 'numCorredor');

        const clubeObjectStore = db.createObjectStore('clube', {keyPath: 'idClube'});
        clubeObjectStore.createIndex('loginClube', 'loginClube', {unique: true});

        const eventoObjectStore = db.createObjectStore('evento', {keyPath: 'idEvento'});
        eventoObjectStore.createIndex('idClube', 'idClube');

        const participacaoObjectStore = db.createObjectStore('participacao', {keyPath: 'idParticipa'});
        participacaoObjectStore.createIndex('idEvento', 'idEvento');
        participacaoObjectStore.createIndex('idCorredor', 'idCorredor');

        const syncObjectStore = db.createObjectStore('sync', {keyPath: 'syncId', autoIncrement: true});
        syncObjectStore.createIndex('idClube', 'idClube');
      };
      idbOpenDBRequest.onsuccess = () => {
        this.db = idbOpenDBRequest.result;
        subscriber.next();
      };
      idbOpenDBRequest.onerror = () => {
        subscriber.error();
      };
    }));
  }


  constructor(private http: HttpClient, private auth: AuthService) {
    this.IndxDb = window.indexedDB;
    this.OpenInitDB();
  }


  // TODO implementar upload de dados
}
