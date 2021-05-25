import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Wallet} from "../wallet/Wallet";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Person} from "./Person";
import {Cost} from "../cost/Cost";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {}

  public findAll(idWallet: number): Observable<Person[]>{
    return this.http.get<Person[]>('http://localhost:8080/api/'+idWallet+'/person');
  }

  public create(person: Person, idWallet: number): Observable<Person>{
    return this.http.post<Person>('http://localhost:8080/api/'+idWallet+'/person', person);
  }
}
