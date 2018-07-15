import {Component, OnInit} from '@angular/core';
import {Game} from '../game';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  games: Game[];

  constructor() {
  }

  ngOnInit() {
  }

}
