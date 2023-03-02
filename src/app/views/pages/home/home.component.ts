import { Component } from '@angular/core';
import {style} from "@angular/animations";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HomeService} from "./home.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  publicacion: any;
  foto: any;

  like={
    'id': ''
  }

  constructor(private http: HttpClient, private router: Router) { }

  comprobarLike(JSON:any){
    const id = JSON.id
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const params = new HttpParams().set('id', id)

    this.http.get("http://localhost:8000/api/publicaciones/tieneLike", {headers, params})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.publicacion = resultado;
          console.log(this.publicacion);
        }
      );

  }

  ngOnInit() {
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})

    this.http.get("http://localhost:8000/api/publicaciones/usuario/amigo", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.publicacion = resultado;
          console.log(this.publicacion);
          //for (const publi in this.publicacion){

          //}
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






