import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {NgForm} from "@angular/forms";
import {Token} from "../token";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  public login(loginForm: NgForm): void{
    this.loginService.login(loginForm.value).subscribe(
      (response: Token) => {
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {
  }

}
