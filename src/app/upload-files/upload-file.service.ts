import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //Wgrywanie plików
  upload(file: File | undefined, costId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // @ts-ignore
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl+'/'+costId+"/upload", formData);

    return this.http.request(req);
  }

  //Tworzenie plików
  create(file: File | undefined):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // @ts-ignore
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl+'/files', formData);

    return this.http.request(req);
  }

  //Wyszukiwanie plików po kosztach
  getFilesByCost(cost: number): Observable<any> {
    return this.http.get(this.baseUrl+"/"+cost+"/files");
  }
  //Wyszukiwanie plików po id
  getFilesById(idFile: string): Observable<any> {
    return this.http.get(this.baseUrl+"/files/" + idFile);
  }

  //Połączenie plików z kosztami w bazie danych
  connectFileWithCost(idFile: string, idCost: number): Observable<any> {
    return this.http.get(this.baseUrl+"/"+idCost+"/files/" + idFile);
  }
}
