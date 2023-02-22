import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-perfildesconocido',
  templateUrl: './perfildesconocido.component.html',
  styleUrls: ['./perfildesconocido.component.css']
})
export class PerfildesconocidoComponent {

  constructor(private http: HttpClient) {}

  parametro: any;
  perfil: any;

  ngOnInit() {
    const headers = new HttpHeaders()
    const id:number = parseInt(localStorage.getItem('idUsuario')!)
    const params = new HttpParams().set('id', id)
    console.log(params)
    // @ts-ignore
    this.http.get('http://localhost:8000/api/usuario/buscarid', {params: params})
      .subscribe(
        resultado => {
          console.log(resultado)
          this.perfil = resultado;
        }
      );
  }
}
