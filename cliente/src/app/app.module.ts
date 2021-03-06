import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from  '@angular/material';

import 'hammerjs';

import { AppComponent } from './app.component';
import {OverlayContainer} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'candy-app-theme';
  }*/
}
