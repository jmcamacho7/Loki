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
  modificar={
    id:'',
    nick:'',
    usuario:'',
    nombre:'',
    fecha:'',
    telefono:'',
    foto:'',
    encabezado:''
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
            this.modificar.nick = this.perfil.nick;
            this.modificar.usuario = this.perfil.usuario;
            this.modificar.nombre = this.perfil.nombre;
            this.modificar.fecha = this.perfil.fecha;
            this.modificar.telefono = this.perfil.telefono;
            this.modificar.foto = this.perfil.foto;
            this.modificar.encabezado = this.perfil.encabezado;
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

  modificarUsuario(){
    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify(
      {
        'id':this.modificar.id,
        'nick':this.modificar.nick,
        'usuario':this.modificar.usuario,
        'nombre':this.modificar.nombre,
        'fecha':this.modificar.fecha,
        'telefono':this.modificar.telefono,
        'foto':this.modificar.foto,
        'encabezado':this.modificar.encabezado
      })
    console.log(body)
    const params = new HttpParams()
    this.http.post('http://localhost:8000/api/usuario/editar', body, {headers: headers, params: params})
      .subscribe((res) => console.log(res))

    const perfil:any = document.getElementById('perfil')
    const editarperfil:any = document.getElementById('editarperfil')
    window.location.reload()
  }


  borrarUsuario(){

    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    const params = new HttpParams()
    const body = JSON.stringify(
      {
        'id':this.modificar.id,
      })
    this.http.post('http://localhost:8000/api/usuario/delete', body, {headers: headers})
      .subscribe((res) => console.log(res))
    window.location.reload()
  }

}
