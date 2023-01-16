import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {IonicModule} from "@ionic/angular";
import { PruebaComponent } from './prueba/prueba.component';
import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    InicioComponent,
    HeroesComponent,
    HomeComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'inicio', component: InicioComponent},
      {path: 'inicio-sesion', component: PruebaComponent},
      {path: 'home', component: HomeComponent},
      {path: 'perfil', component: PerfilComponent},
    ]),
    IonicModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
