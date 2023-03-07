import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TendenciasService {

  private url = 'http://localhost:8000/api/tags/listar';

  constructor(private httpClient: HttpClient) { }

  getTendencias(page: number){
    return this.httpClient.get(this.url + '?page=' + page);
  }
}
