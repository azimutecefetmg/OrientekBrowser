import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {EventosService} from '../eventos.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-buscar-eventos',
  templateUrl: './buscar-eventos.component.html',
  styleUrls: ['./buscar-eventos.component.css']
})
export class BuscarEventosComponent implements OnInit {

  loading: boolean;
  results$;
  results;
  searchTerm$ = new Subject<string>();

  constructor(private eventosService: EventosService) {
    this.results$ = this.searchTerm$.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      //TODO BUSQUE A SESSÃO ANTERIOR DO FIREFOX E TERMINE A PESQUISA
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.eventosService.searchEntries(term)),
    );
    this.results$.subscribe(data => {
      this.results = data;
      console.log(data);
      this.loading = false;
    }, (err) => {
      console.error(err);
      this.loading = false;

    });
  }

  search(term) {
    if (term.length > 0) {
      this.loading = true;
      this.searchTerm$.next(term);
    } else {
      this.loading = false;
    }
  }

  ngOnInit() {

  }

}
