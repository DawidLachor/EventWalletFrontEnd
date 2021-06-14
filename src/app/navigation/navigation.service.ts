import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  jwt: boolean = false;
  constructor() { }

  //Sprawdzenie tokena JWT
  checkJWT(): void{
    //SSprawdzamy czy istnieje w cooki taki token
    let token = localStorage.getItem('authenticationToken');
    this.jwt = !!token;
  }
}
