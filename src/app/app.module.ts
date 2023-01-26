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
import {FontAwesomeModule, FaIconLibrary,} from '@fortawesome/angular-fontawesome';
import {faStackOverflow, faGithub, faMedium,} from '@fortawesome/free-brands-svg-icons';
import {HttpClientModule} from '@angular/common/http';
import {faHome, faMessage, faBell, faWrench, faPerson, faPlus, faShare, faXmark} from '@fortawesome/free-solid-svg-icons';

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
      {path: 'heroes', component: HeroesComponent}
    ]),
    IonicModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faStackOverflow,
      faGithub,
      faMedium,
      faHome,
      faBell,
      faWrench,
      faMessage,
      faPerson,
      faPlus,
      faShare,
      faXmark
    );
  }
}
