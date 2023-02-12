import { Component } from '@angular/core';
import {PruebaService} from "../../../shared/services/prueba.service";
import {tokenService} from "../../../shared/services/token.service";
import {RestService} from "../../../shared/services/rest.service";
import {provideRouter, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  usuario_id:string = '';
  password:string = ''

  constructor(public readonly authService: AuthService, private readonly router: Router) {

  }

  onEmailInput(event: Event){
    const target = event.target as HTMLInputElement;
    this.usuario_id = target.value;
  }

  onPasswordInput(event:Event){
    const target = event.target as HTMLInputElement;
    this.password = target.value;
  }

  login() {
    this.authService.login({
      usuario: this.usuario_id,
      password: this.password,
    }).subscribe({
      complete: () => {
        this.router.navigateByUrl('/home')
      }
    })
  }


}
