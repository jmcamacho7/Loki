import { Component } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PruebaComponent} from "../prueba/prueba.component";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

}

const appRoutes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-sesion', component: PruebaComponent}
];
