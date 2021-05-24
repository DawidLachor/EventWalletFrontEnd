import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../login/login";
import {Observable} from "rxjs";
import {Token} from "../token";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  public login(login: Login): Observable<Token>{
    return this.http.post<Token>('http://localhost:8080/api/registration', login);
  }
}
