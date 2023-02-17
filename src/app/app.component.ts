import {Component, NgModule} from '@angular/core';
import {InicioComponent} from "./views/pages/registro/inicio.component";
import {PruebaComponent} from "./views/pages/iniciosesion/prueba.component";
import {AppService} from "./app.service";
import {HomeComponent} from "./views/pages/home/home.component";
import {BuscadorService} from "./shared/services/buscador.service";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';


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

  router: string;



  art={
    usuario_id:2,
    texto:"",
    foto:"https://i.imgur.com/mT0MaAc.jpeg"
  }
  constructor(private http: HttpClient, private _router: Router, private buscadorService: BuscadorService) {
    this.router = _router.url;
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
      'foto':''})
    console.log(body)
    const params = new HttpParams()
    this.http.post('http://localhost:8000/api/publicacion/save', body, {headers: headers, params: params})
      // @ts-ignore
      .subscribe(() => {
        alert('Publicación enviada')
      });
    alert('Publicación enviada')
    this.refreshPage();
  }

  buscador={
    nombre: ''
  }
  listaUsuarios: any;
  buscarUsuario(){
    const headers = new HttpHeaders()
    const body = JSON.stringify({
      'nombre':this.buscador.nombre
    })
    console.log(body)
    const params = new HttpParams()
    // @ts-ignore
    this.http.get('http://localhost:8000/api/usuario/buscar', body)
      .subscribe(
        resultado => {
          this.buscadorService.listaUsuario = resultado;
          console.log(resultado)
          window.location.href = '/busqueda'
        }
      );

  }

}

import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
@NgModule({
  imports: [IonicModule],
})
export class AppModule {

}




