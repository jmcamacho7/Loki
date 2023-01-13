import {Component, NgModule} from '@angular/core';
import {InicioComponent} from "./inicio/inicio.component";
import {PruebaComponent} from "./prueba/prueba.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loki';
}

import { IonicModule } from '@ionic/angular';
@NgModule({
  imports: [IonicModule],
})
export class AppModule {}




