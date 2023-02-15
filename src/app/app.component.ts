import {Component, NgModule} from '@angular/core';
import {InicioComponent} from "./views/pages/registro/inicio.component";
import {PruebaComponent} from "./views/pages/iniciosesion/prueba.component";
import {AppService} from "./app.service";
import {HomeComponent} from "./views/pages/home/home.component";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Loki';
  abrirTidal(){
    const tidal:any = document.getElementById('escribir');
    tidal.style.display = 'block';
  }
  cerrarTidal(){
    const tidal:any = document.getElementById('escribir');
    tidal.style.display = 'none';
  }

  router: string;



  art={
    usuario_id:2,
    texto:"",
    foto:"https://i.imgur.com/mT0MaAc.jpeg"
  }
  constructor(private http: HttpClient, private _router: Router) {
    this.router = _router.url;
  }

  guardarPubli(){
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({'texto':this.art.texto})
    console.log(body)
    const params = new HttpParams()
    this.http.post('http://localhost:8000/api/publicacion/save', body, {headers: headers, params: params})
      .subscribe((res) => console.log(res))
    alert('Mensaje enviado')
  }

}

import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
@NgModule({
  imports: [IonicModule],
})
export class AppModule {

}




