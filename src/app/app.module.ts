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
import {faHome, faMessage, faBell, faWrench, faPerson, faPlus, faShare, faXmark, faSearch, faHeart} from '@fortawesome/free-solid-svg-icons';
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./shared/services/auth.service";
import {PruebaService} from "./shared/services/prueba.service";
import {RestService} from "./shared/services/rest.service";
import { BuscadorComponent } from './views/pages/buscador/buscador.component';
import {BuscadorService} from "./shared/services/buscador.service";
import { ChatComponent } from './views/pages/chat/chat.component';
import { PerfildesconocidoComponent } from './views/pages/perfildesconocido/perfildesconocido.component';
import { NgxPaginationModule } from 'ngx-pagination';

const appRoutes:Routes=[
  {path: 'registro', component: InicioComponent},
  {path: 'inicio-sesion', component: PruebaComponent},
  {path: 'home', component: HomeComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'busqueda', component: BuscadorComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'perfil-usuario', component: PerfildesconocidoComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    InicioComponent,
    HeroesComponent,
    HomeComponent,
    PerfilComponent,
    BuscadorComponent,
    ChatComponent,
    PerfildesconocidoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    IonicModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [AuthService, PruebaService, RestService, BuscadorService],
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
      faXmark,
      faSearch,
      faHeart
    );
  }
}
