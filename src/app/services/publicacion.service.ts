import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private url = 'http://localhost:8000/api/publicaciones/usuario/amigo';

  constructor(private httpClient: HttpClient) { }

  getPublicacion(page: number){
    return this.httpClient.get(this.url + '?page=' + page);
  }
}
