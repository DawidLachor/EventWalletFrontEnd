import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {NgForm} from "@angular/forms";
import {Token} from "../token";
import {HttpErrorResponse} from "@angular/common/http";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) {
  }
  ngOnInit(): void {
  }
  public register(registerForm: NgForm): void {
    this.registerService.registerService(registerForm.value).subscribe()
  }
}
