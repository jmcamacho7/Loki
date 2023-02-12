import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {IonicModule} from "@ionic/angular";
import { PruebaComponent } from './views/pages/iniciosesion/prueba.component';
import { InicioComponent } from './views/pages/registro/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './views/pages/heroes/heroes.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { PerfilComponent } from './views/pages/perfil/perfil.component';
import {FontAwesomeModule, FaIconLibrary,} from '@fortawesome/angular-fontawesome';
import {faStackOverflow, faGithub, faMedium,} from '@fortawesome/free-brands-svg-icons';
import {HttpClientModule} from '@angular/common/http';
import {faHome, faMessage, faBell, faWrench, faPerson, faPlus, faShare, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./shared/services/auth.service";
import {PruebaService} from "./shared/services/prueba.service";
import {RestService} from "./shared/services/rest.service";
import {tokenService} from "./shared/services/token.service";

const appRoutes:Routes=[
  {path: 'registro', component: InicioComponent},
  {path: 'inicio-sesion', component: PruebaComponent},
  {path: 'home', component: HomeComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'heroes', component: HeroesComponent}
];
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
    RouterModule.forRoot(appRoutes),
    IonicModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, PruebaService, RestService, tokenService],
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
