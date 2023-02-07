import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { InicioComponent} from "./registro/inicio.component";
import {PruebaComponent} from "./iniciosesion/prueba.component";

const routes: Routes = [
  { path: 'registro', component: InicioComponent },
  { path: 'registro-sesion', component: PruebaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
