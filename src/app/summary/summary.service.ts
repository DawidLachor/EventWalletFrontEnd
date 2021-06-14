import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Summary} from "./Summary";
import {Cost} from "../cost/Cost";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient) { }

  public getSummary(idWallet: number): Observable<Summary[]> {
    return this.http.get<Summary[]>('http://localhost:8080/api/' + idWallet + "/summary");
  }

  repayment(idWallet: number, idPerson: number, cost: Cost): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/' + idWallet + "/summary/" + idPerson, cost);
  }
}
