import {Component, NgModule} from '@angular/core';
import {InicioComponent} from "./views/pages/registro/inicio.component";
import {PruebaComponent} from "./views/pages/iniciosesion/prueba.component";
import {AppService} from "./app.service";
import {HomeComponent} from "./views/pages/home/home.component";
import {BuscadorService} from "./shared/services/buscador.service";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {BuscadorComponent} from "./views/pages/buscador/buscador.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Loki';

  // Elementos que se usan en los métodos

  art={
    usuario_id:2,
    texto:"",
    foto:"",
    tags:''
  }

  buscador={
    nombre: ''
  }

  hideDiv = false;

  constructor(private http: HttpClient, private router: Router, private buscadorService: BuscadorService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const url = val.url;
        if (url === '/inicio-sesion' || url === '/registro') {
          this.hideDiv = true;
        } else {
          this.hideDiv = false;
        }
      }
    });
  }
  abrirTidal(){
    const tidal:any = document.getElementById('escribir');
    tidal.style.display = 'block';
  }
  abrirBuscador(){
    const tidal:any = document.getElementById('buscador');
    tidal.style.display = 'block';
  }
  cerrarBuscador(){
    const tidal:any = document.getElementById('buscador');
    tidal.style.display = 'none';
  }
  cerrarTidal(){
    const tidal:any = document.getElementById('escribir');
    tidal.style.display = 'none';
  }
  refreshPage() {
    location.reload();
  }
  guardarPubli(){
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({
      'usuarioId':1,
      'texto':this.art.texto,
      'foto':'',
      'tags':this.art.tags})
    console.log(body)
    const params = new HttpParams()
    this.http.post('http://localhost:8000/api/publicacion/save', body, {headers: headers, params: params})
      // @ts-ignore
      .subscribe(() => {
        alert('Publicación enviada')
      });
    alert('Publicación enviada')
    if (this.router.url.includes('/home'))
    {
      this.refreshPage();
    }
    else{

    }
  }
  buscarUsuario(){
    console.log(this.buscador.nombre)
    let termino = this.buscador.nombre
    localStorage.setItem('busqueda', this.buscador.nombre)
    if (this.router.url.includes('/busqueda'))
    {
      this.refreshPage();
    }
    else{
      this.router.navigate(['/busqueda']);
    }
  }

}

import { IonicModule } from '@ionic/angular';
import {NavigationEnd, Router} from "@angular/router";
@NgModule({
  imports: [IonicModule],
})
export class AppModule {

}




