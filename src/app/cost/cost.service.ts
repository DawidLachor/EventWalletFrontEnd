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

  public update(cost: Cost, personId: number | undefined, walletId: number): Observable<void>{
    return this.http.put<void>('http://localhost:8080/api/'+ walletId+"/costs/"+personId, cost);
  }

  public createWithPhoto(cost: Cost, personId: number | undefined, walletId: number): Observable<Cost>{
    return this.http.post<Cost>('http://localhost:8080/api/'+ walletId+"/costs/"+personId, cost);
  }

  public create(cost: Cost, personId: number | undefined, walletId: number): Observable<Cost>{
    return this.http.post<Cost>('http://localhost:8080/api/'+ walletId+"/costs/"+personId, cost);
  }

  delete(id: number,walletId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/'+ walletId+"/costs/"+id);
  }
}
