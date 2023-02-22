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

  numeroTidals={
    numero: ''
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
          this.numeroTidals.numero = resultado.length;
          this.perfil = resultado;
          console.log(this.perfil);
        }
      );

    this.http.get("http://localhost:8000/api/publicaciones/mis-publicaciones", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.tidals = resultado.reverse();
          console.log(this.tidals);
        }
      );

  }

}
