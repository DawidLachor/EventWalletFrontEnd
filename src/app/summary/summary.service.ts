import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Summary} from "./Summary";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient) { }

  public getSummary(idWallet: number): Observable<Summary[]> {
    return this.http.get<Summary[]>('http://localhost:8080/api/' + idWallet + "/summary");
  }
}
