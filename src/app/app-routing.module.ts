import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { InicioComponent} from "./inicio/inicio.component";
import {PruebaComponent} from "./prueba/prueba.component";

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-sesion', component: PruebaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
