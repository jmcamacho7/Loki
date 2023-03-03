import { Component, OnInit } from '@angular/core';
import {style} from "@angular/animations";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HomeService} from "./home.service";
import {Router} from "@angular/router";
import { concatMap } from 'rxjs/operators';
import {of} from "rxjs";
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

  refreshPage() {
    location.reload();
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
          this.getPublicacion();

        }
      );
  }
  abrirPerfil(id:string){
    localStorage.setItem('idUsuario', id)
    console.log(localStorage.getItem('idUsuario'))
    this.router.navigate(['/perfil-usuario']);
  }

  likes(id:string){
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({
      'id' : id
    })
    console.log(body)
    this.http.post('http://localhost:8000/api/publicacion/likeodislike', body, {headers: headers})
      // @ts-ignore
      .subscribe(() => {

      },
        error => {
          if (error.status === 200) {
            // @ts-ignore
            this.refreshPage()
          }
          if (error.status === 300){
            this.refreshPage()
          }
        });
  }
}






