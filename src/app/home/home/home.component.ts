import { Component, OnInit, Renderer2 } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string = 'Pedro Israel';

  constructor(private renderer: Renderer2 ) {
    this.renderer.removeClass(document.body, 'main-gradient');
    this.renderer.addClass(document.body, 'bg-gray');
  }

  ngOnInit(): void {
    // let token = localStorage.getItem('token')
    // console.log('oi')
    // let decoded = jwt_decode(token);
    // this.name = decoded['name']
  }

}
