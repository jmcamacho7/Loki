import { Component } from '@angular/core';
import {style} from "@angular/animations";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HomeService} from "./home.service";
import {Router} from "@angular/router";
import { concatMap } from 'rxjs/operators';
import {of} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  publicacion: any;
  publicaciones: any;
  foto: any;

  like={
    'id': ''
  }

  constructor(private http: HttpClient, private router: Router) { }

  comprobarLike(JSON: any, Lista: Array<any>) {
    const id = JSON.id;
    console.log(id)
    const token: string | null = localStorage.getItem('token');
    const headers = new HttpHeaders({'apikey': token!});
    const params = new HttpParams().set('id', id);

    this.http.get("http://localhost:8000/api/publicaciones/tieneLike", {headers, params})
      .pipe(
        concatMap(resultado => {
          JSON.tienelike = resultado;
          console.log(resultado)
          Lista.push(JSON);
          return of(JSON); // devuelve el JSON para que se pueda acceder fuera del observable
        })
      )
      .subscribe();
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

          this.publicaciones = resultado;
          console.log(this.publicaciones);
          for (const publi of this.publicaciones){
            this.comprobarLike(publi, lista)
          }
          console.log(lista)
          this.publicacion = lista
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






