import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-main-event-list',
  templateUrl: './main-event-list.component.html',
  styleUrls: ['./main-event-list.component.css']
})
export class MainEventListComponent implements OnInit {
  eventos;

  constructor(private database: DatabaseService) {
    this.database.OpenInitDB().subscribe(() => {
      this.database.syncDowload().subscribe(() =>
          this.database.getEventos().subscribe((data) => this.eventos = data),
        () => this.database.getEventos().subscribe((data) => this.eventos = data)
      );
    });
  }

  ngOnInit() {
  }

}
