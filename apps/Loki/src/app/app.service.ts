import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  guardarPublicacion(publicacion: any) {
    this.http
      .post(
        `http://localhost:8000/publicacion/save`,
        JSON.stringify(publicacion)
      )
      .subscribe((resultado) => {
        console.log(resultado);
      });
  }
}
