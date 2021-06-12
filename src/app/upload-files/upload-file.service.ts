import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  upload(file: File | undefined, costId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // @ts-ignore
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl+'/'+costId+"/upload", formData);

    return this.http.request(req);
  }

  create(file: File | undefined):Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // @ts-ignore
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl+'/files', formData);

    return this.http.request(req);
  }

  getFilesByCost(cost: number): Observable<any> {
    return this.http.get(this.baseUrl+"/"+cost+"/files");
  }

  getFilesById(idFile: string): Observable<any> {
    return this.http.get(this.baseUrl+"/files/" + idFile);
  }

  connectFileWithCost(idFile: string, idCost: number): Observable<any> {
    return this.http.get(this.baseUrl+"/"+idCost+"/files/" + idFile);
  }
}
