import {Component, NgModule} from '@angular/core';
import {InicioComponent} from "./inicio/inicio.component";
import {PruebaComponent} from "./prueba/prueba.component";
import {AppService} from "./app.service";


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

  publicacion:any;

  art={
    usuario_id:2,
    texto:"",
    foto:"https://i.imgur.com/mT0MaAc.jpeg"
  }
  constructor(private AppServicio: AppService) { }

  guardarPubli(){
    let usuario = 2;
    let mensaje = (<HTMLInputElement>document.getElementById("mensaje")).value;
    let profilepic = 'https://i.imgur.com/mT0MaAc.jpeg';
    this.AppServicio.guardarPublicacion(this.art).subscribe((datos:any) => {
    });
  }

}

import { IonicModule } from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
@NgModule({
  imports: [IonicModule],
})
export class AppModule {

}




