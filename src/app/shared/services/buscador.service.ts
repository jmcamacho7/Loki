import { Injectable } from '@angular/core';
import {BuscadorComponent} from "../../views/pages/buscador/buscador.component";

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  listaUsuario: any;
  constructor() { }
}
