import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfildesconocido',
  templateUrl: './perfildesconocido.component.html',
  styleUrls: ['./perfildesconocido.component.css']
})
export class PerfildesconocidoComponent implements AfterViewInit  {

  @ViewChild('seguirBtn') seguirBtn!: ElementRef;
  @ViewChild('siguiendoBtn') siguiendoBtn!: ElementRef;

  ngAfterViewInit() {
    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    this.http.get("http://localhost:8000/api/amigos/mis-amigos", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          this.lista = resultado;
          console.log(this.lista);
          // @ts-ignore
          if (this.lista.find(amigo => amigo.id === parseInt(localStorage.getItem('idUsuario')!))) {
            this.seguirBtn.nativeElement.style.display = 'none';
            this.siguiendoBtn.nativeElement.style.display = 'block';
          } else {
            this.seguirBtn.nativeElement.style.display = 'block';
            this.siguiendoBtn.nativeElement.style.display = 'none';
          }
        }
      );
  }
  constructor(private http: HttpClient, private router: Router) {}

  numeros={
    numeroTidals: '',
    numeroSiguiendo: '',
    numeroSeguidores: ''
  }
  perfil: any;

  usuario: any;

  tidals: any;

  lista: any;

  comprobacion = 0;

  ngOnInit() {
    const id:number = parseInt(localStorage.getItem('idUsuario')!)
    const params = new HttpParams().set('id', id)

    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})

    this.http.get("http://localhost:8000/api/usuario/mi-usuario", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          localStorage.setItem('idPerfil', resultado.id)
        }
      );
    const idPerfil:number = parseInt(localStorage.getItem('idPerfil')!)
    if (id === idPerfil){
      this.router.navigate(['/perfil']);
    }
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
          // @ts-ignore
          this.numeros.numeroTidals = resultado.length;
          this.tidals = resultado;
        }
      );
  }
  seguirUsuario(){
    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({
      'usuarioId':1,
      'amigoId':localStorage.getItem('idUsuario')})
    const params = new HttpParams()
    const siguiendo:any = document.getElementById('siguiendo')
    const seguir:any = document.getElementById('seguir')
    this.http.post('http://localhost:8000/api/amigos/save', body, {headers: headers, params: params})
      // @ts-ignore
      .subscribe(() => {

      });
    seguir.style.display = 'none'
    siguiendo.style.display = 'block'
  }
  borrarSeguir(){
    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({
      'usuarioId':1,
      'amigoId':localStorage.getItem('idUsuario')})
    const params = new HttpParams()
    const siguiendo:any = document.getElementById('siguiendo')
    const seguir:any = document.getElementById('seguir')
    this.http.delete('http://localhost:8000/api/amigos/delete', {body, headers})
      // @ts-ignore
      .subscribe(() => {

      });
    seguir.style.display = 'block'
    siguiendo.style.display = 'none'
  }
}
