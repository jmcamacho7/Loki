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

  onEmailInput(event: Event){
    const target = event.target as HTMLInputElement;
    this.usuario_id = target.value;
  }

  onPasswordInput(event:Event){
    const target = event.target as HTMLInputElement;
    this.password = target.value;
  }

  delay(time:any) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  login() {
    const body = JSON.stringify({
      "usuario":"juanma",
      "password":"1234"});
    console.log(body);
    let tokencito:string = ''
    const params = new HttpParams();
    const headers = new HttpHeaders();
    this.http.post<AuthResponse>("http://localhost:8000/login", body, {'headers':headers,'params':params})
      .subscribe(data =>
        // @ts-ignore
     this.tokencito = data.token.token, localStorage.setItem('token', this.tokencito));
    console.log(localStorage.getItem('token'))
  }


}
