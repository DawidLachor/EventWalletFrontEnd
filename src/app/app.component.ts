import { Component } from '@angular/core';
import {Login} from "./login/login";
import {LoginService} from "./login/login.service";
import {Token} from "./token";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WalletProjectFrontEnd';
}
