import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Wallet} from "../wallet/Wallet";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cost} from "./Cost";

@Injectable({
  providedIn: 'root'
})
export class CostService {

  constructor(private http: HttpClient) { }

  public findAll(walletId: number): Observable<Cost[]>{
    return this.http.get<Cost[]>('http://localhost:8080/api/'+walletId+"/costs");
  }
}
