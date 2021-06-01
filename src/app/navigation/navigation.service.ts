import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  jwt: boolean = false;
  constructor() { }

  checkJWT(): void{
    let token = localStorage.getItem('authenticationToken');
    if (token){
      this.jwt = true;
    } else {
      this.jwt = false;
    }
  }
}
