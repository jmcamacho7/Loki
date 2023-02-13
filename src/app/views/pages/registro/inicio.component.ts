import { Component } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PruebaComponent} from "../iniciosesion/prueba.component";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private http: HttpClient) { }

  nuevo={
    usuario:'',
    email:'',
    password:''
  }
  guardarUsuario(){
    const headers = new HttpHeaders()
    const body = JSON.stringify(
      {'usuario':this.nuevo.usuario,
      'email':this.nuevo.email,
      'password':this.nuevo.password})
    console.log(body)
    const params = new HttpParams()
    this.http.post('http://localhost:8000/api/usuario/registrar', body, {headers: headers, params: params})
      .subscribe((res) => console.log(res))
    const logro:any = document.getElementById('logro');
    logro.style.display = 'block';

  }
}

const appRoutes: Routes = [
  { path: 'registro', component: InicioComponent },
  { path: 'registro-sesion', component: PruebaComponent}
];
