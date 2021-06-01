import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {NgForm} from "@angular/forms";
import {Token} from "../token";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NavigationComponent} from "../navigation/navigation.component";
import {NavigationService} from "../navigation/navigation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  signin: boolean = false;
  constructor(private loginService: LoginService,  private router: Router, private navigation: NavigationService) {
  }

  public login(loginForm: NgForm): void{
    this.loginService.login(loginForm.value).subscribe(
      (response: Token) => {
        localStorage.setItem('authenticationToken', response.authenticationToken)
        this.router.navigate(['/wallet']);
        this.navigation.checkJWT();
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        this.signin = true;
      }
    )
  }

  ngOnInit(): void {
  }

}
