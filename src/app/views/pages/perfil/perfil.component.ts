import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  perfil: any;
  tidals: any;

  numeros={
    numeroTidals: '',
    numeroSiguiendo: '',
    numeroSeguidores: ''
  }
  constructor(private http: HttpClient) { }
  ngOnInit() {
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})

    this.http.get("http://localhost:8000/api/usuario/mi-usuario", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.perfil = resultado;
          console.log(this.perfil);
        }
      );

    this.http.get("http://localhost:8000/api/publicaciones/mis-publicaciones", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          this.tidals = resultado.reverse();
          // @ts-ignore
          this.numeros.numeroTidals = resultado.length;
          console.log(this.tidals);
        }
      );

    this.http.get("http://localhost:8000/api/amigos/mis-amigos", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          this.numeros.numeroSiguiendo = resultado.length;
        },
          error => {
            if (error.status === 300) {
              // @ts-ignore
              this.numeros.numeroSiguiendo = 0;
            }
        }
      );
    this.http.get("http://localhost:8000/api/amigos/mis-seguidores", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          console.log('Seguidores:', resultado)
          // @ts-ignore
          this.numeros.numeroSeguidores = resultado.length;
        },
        error => {
          if (error.status === 300) {
            // @ts-ignore
            this.numeros.numeroSeguidores = 0;
          }
        }
      );

  }

}
