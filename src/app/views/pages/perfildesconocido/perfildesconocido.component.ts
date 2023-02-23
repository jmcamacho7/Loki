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

  tidals: any;

  lista: any;

  comprobacion = 0;

  ngOnInit() {
    const id:number = parseInt(localStorage.getItem('idUsuario')!)
    const params = new HttpParams().set('id', id)
    // @ts-ignore
    this.http.get('http://localhost:8000/api/usuario/buscarid', {params: params})
      .subscribe(
        resultado => {
          this.perfil = resultado;
        }
      );
    this.http.get('http://localhost:8000/api/publicaciones/publicaciones-por-id', {params: params})
      .subscribe(
        resultado => {
          this.tidals = resultado;
        }
      );

    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const siguiendo:any = document.getElementById('siguiendo')
    const seguir:any = document.getElementById('seguir')

    this.http.get("http://localhost:8000/api/amigos/mis-amigos", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          this.lista = resultado;
          console.log(this.lista);
          //for (let i = 0; i < this.lista.length; i++){
            //console.log(this.lista.nombre)
            //if (this.lista.id == id){
              //seguir.style.display='none';
              //siguiendo.style.display='block';
            //}
          //}
        }
      );


  }
}
