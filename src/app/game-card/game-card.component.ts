import {Component, OnInit} from '@angular/core';
import {Game} from '../game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  game: Game;

  constructor() {
  }

  ngOnInit() {
  }

}
