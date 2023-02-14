import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private httpClient: HttpClient
  ) { }
  login(postData: any): Observable<any> {
  
    return this.httpClient.post(`${environment.apiUrl}`+'logincheck', postData,this.httpOptions);
    }
    
   signup(signUpData: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}`+'registeruser', signUpData,this.httpOptions);
 
    } 
    
   
}
