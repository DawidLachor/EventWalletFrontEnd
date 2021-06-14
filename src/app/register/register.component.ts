import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {NgForm} from "@angular/forms";
import {Token} from "../token";
import {HttpErrorResponse} from "@angular/common/http";
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signup: boolean = false;
  constructor(private registerService: RegisterService, private router: Router) {
  }
  ngOnInit(): void {
  }
  //Rejestracja konta
  public register(registerForm: NgForm): void {
    this.registerService.registerService(registerForm.value).subscribe(
      value => {
        //Gdy rejestracja sie powiedzie to zostanie przekierowany do strony głównej
        this.router.navigate([''])
      },error => {
        this.signup=true;
      }
    )
  }
}
