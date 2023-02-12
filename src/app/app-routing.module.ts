import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './views/pages/heroes/heroes.component';
import { InicioComponent} from "./views/pages/registro/inicio.component";
import {PruebaComponent} from "./views/pages/iniciosesion/prueba.component";

const routes: Routes = [
  { path: 'registro', component: InicioComponent },
  { path: 'registro-sesion', component: PruebaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
