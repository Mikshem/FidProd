import { Component } from '@angular/core';
import {MdSidenavModule} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isDarkTheme: boolean = false;
}
