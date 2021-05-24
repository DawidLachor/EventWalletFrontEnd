import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "./login";
import {Token} from "../token";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  public login(login: Login): Observable<Token>{
    return this.http.post<Token>('http://localhost:8080/api/login', login);
  }
}
