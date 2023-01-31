import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url='http://localhost:8000/'
  constructor(private http: HttpClient) { }

  guardarPublicacion(publicacion:any){
    return this.http.post(`${this.url}publicacion/save`, JSON.stringify(publicacion));
  }
}
