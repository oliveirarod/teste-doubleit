import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  name: string;

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let decoded: any = jwt_decode(token);
    this.name = decoded['name']
  }

}
