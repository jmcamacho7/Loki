import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";

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

  verEditar(){
    const perfil:any = document.getElementById('perfil')
    const editarperfil:any = document.getElementById('editarperfil')
    perfil.style.display = 'none'
    editarperfil.style.display = 'block'
  }
  verPerfil(){
    const perfil:any = document.getElementById('perfil')
    const editarperfil:any = document.getElementById('editarperfil')
    perfil.style.display = 'block'
    editarperfil.style.display = 'none'
  }
  modificar={
    nick:'',
    usuario:'',
    nombre:'',
    fecha:'',
    telefono:'',
    foto:'',
    encabezado:''
  }
  modificarUsuario(){
    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify(
      {
        'nick':this.modificar.nick,
        'usuario':this.modificar.usuario,
        'nombre':this.modificar.nombre,
        'fecha':this.modificar.fecha,
        'telefono':this.modificar.telefono,
        'foto':this.modificar.foto,
        'encabezado':this.modificar.encabezado
      })
    console.log(body)
    // const params = new HttpParams()
    // this.http.post('http://localhost:8000/api/usuario/registrar', body, {headers: headers, params: params})
    //   .subscribe((res) => console.log(res))
    // const logro:any = document.getElementById('logro');
    // logro.style.display = 'block';
  }

}
