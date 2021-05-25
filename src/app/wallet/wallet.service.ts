import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../register/registerRequest";
import {Observable} from "rxjs";
import {Wallet} from "./Wallet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Wallet[]>{
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    return this.http.get<Wallet[]>('http://localhost:8080/api/wallet/all', {headers: headers});
  }

  public update(wallet: Wallet): Observable<void>{
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")

    return this.http.put<void>('http://localhost:8080/api/wallet',wallet, {headers: headers});
  }

  public create(wallet: Wallet): Observable<void>{
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + localStorage.getItem('authenticationToken'))
    headers = headers.append("Access-Control-Allow-Origin", "*")
    return this.http.post<void>('http://localhost:8080/api/wallet',wallet, {headers: headers});
  }
}
