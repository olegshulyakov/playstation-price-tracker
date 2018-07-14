import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Game Price Monitor';
  autoCompleteControl = new FormControl();
  options: string[];

  constructor() {
  }

  ngOnInit() {
  }

  updateOptions() {
    this.options = ['Game 1', 'Game 2', 'Game 3'];
  }

}
