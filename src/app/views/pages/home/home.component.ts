import { Component, OnInit } from '@angular/core';
import {style} from "@angular/animations";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HomeService} from "./home.service";
import {Router} from "@angular/router";
import {PublicacionService} from "../../../services/publicacion.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  publicacion: any;
  foto: any;

  like={
    'id': ''
  }
  p: number = 1;
  total: number = 0;

  constructor(private http: HttpClient, private service:PublicacionService, private router: Router) { }

  ngOnInit2() {
    this.getPublicacion();
  }

  getPublicacion(){
    this.service.getPublicacion(this.p)
      .subscribe((response: any) => {
        this.publicacion = response.data;
        this.total = response.total;
      });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getPublicacion();
  }

  comprobarLike(JSON:any, Lista:Array<any>){
    const id = JSON.id
    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})
    const params = new HttpParams().set('id', id)

    this.http.get("http://localhost:8000/api/publicaciones/tieneLike", {headers, params})
      .subscribe(
        resultado => {
          // @ts-ignore
          JSON.tienelike = resultado
          Lista.push(JSON)
        }
      );

  }

  ngOnInit() {
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    let lista: any[] = [];

    this.http.get("http://localhost:8000/api/publicaciones/usuario/amigo", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.publicacion = resultado;
          console.log(this.publicacion);
          for (const publi of this.publicacion){
            this.comprobarLike(publi, lista)
          }
          this.getPublicacion();
          console.log(lista)
        }
      );
  }
  abrirPerfil(id:string){
    localStorage.setItem('idUsuario', id)
    console.log(localStorage.getItem('idUsuario'))
    this.router.navigate(['/perfil-usuario']);
  }

  likes(id:string){
    const body = JSON.stringify({
      'id' : id
    })
    this.http.post('http://localhost:8000/api/publicacion/save', body)
      // @ts-ignore
      .subscribe(() => {

      });
  }
}






