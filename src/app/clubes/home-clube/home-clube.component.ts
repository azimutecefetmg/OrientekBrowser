import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../database.service';

@Component({
  selector: 'app-home-clube',
  templateUrl: './home-clube.component.html',
  styleUrls: ['./home-clube.component.css']
})
export class HomeClubeComponent implements OnInit {

  constructor(private database: DatabaseService) {
    this.database.OpenInitDB();
  }

  ngOnInit() {

  }
}
