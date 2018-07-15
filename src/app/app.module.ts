import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GameCardComponent} from './game-card/game-card.component';
import {GridComponent} from './grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameCardComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
