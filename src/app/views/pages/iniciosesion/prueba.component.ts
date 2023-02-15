import { Component } from '@angular/core';
import {PruebaService} from "../../../shared/services/prueba.service";
import {tokenService} from "../../../shared/services/token.service";
import {RestService} from "../../../shared/services/rest.service";
import {provideRouter, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthRequest} from "../../../shared/models/auth.request";
import {AuthResponse} from "../../../shared/models/auth.response";
import {delay} from "rxjs";


@Component({
  selector: 'app-iniciosesion',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  usuario_id:string = '';
  password:string = ''

  constructor(public readonly authService: AuthService, private readonly router: Router, private http: HttpClient) {

  }

  usuario ={
    usuario: '',
    password: ''
  }

  async login() {
    let prueba = await this.prometo();
    console.log(prueba);
    // @ts-ignore
    localStorage.setItem('token', prueba)
    console.log(localStorage.getItem('token'))
  }
async prometo(){
  const body = JSON.stringify({
    "usuario":this.usuario.usuario,
    "password":this.usuario.password});
  console.log(body);
  let tokencito:string = ''
  const params = new HttpParams();
  const headers = new HttpHeaders();
  return await this.http.post<AuthResponse>("http://localhost:8000/api/login", body, {'headers':headers,'params':params})
    .toPromise().then(data =>
    // @ts-ignore
    this.tokencito = data.token.token, localStorage.setItem('token', this.tokencito))
    .catch(msg => alert('Error: usuario o contraseña erroneos'));

}

}
