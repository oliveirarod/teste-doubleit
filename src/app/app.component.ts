import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Rodrigo de Oliveira - Prova DoubleIt';
  name = localStorage.getItem('name');

  constructor(public router: Router){}
}
