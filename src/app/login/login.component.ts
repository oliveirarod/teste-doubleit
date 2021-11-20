import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,private router: Router, private modalService: NgbModal) {}

  user: string;
  password: string;
  msg: string;

  ngOnInit(): void {
  }

  login(content: any){
    
    if (this.user != "" && this.password != "") {
      let login = this.loginService.login(this.user, this.password);

      if (login) {
        this.router.navigate(['']);
      }
      else {
        this.msg = "Login e/ou senha incorretos";
        this.modalService.open(content);
      }
    }
    else{
      this.msg = "Preencha o usuário e senha para efetuar o login"
      this.modalService.open(content);
    }
  }
}