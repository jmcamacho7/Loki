import { Component } from '@angular/core';
import {BuscadorService} from "../../../shared/services/buscador.service";
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  constructor(private http: HttpClient, private router: Router) {}

  parametro: any;
  listaUsuarios: any;
  ngOnInit() {
    const body = JSON.stringify({
      'nombre':localStorage.getItem('busqueda')
    })
    console.log(body)
    const params = new HttpParams().set('nombre', localStorage.getItem('busqueda')!)
    console.log(params)
    // @ts-ignore
    this.http.get('http://localhost:8000/api/usuario/buscar2', {params: params})
      .subscribe(
        resultado => {
          console.log(resultado)
          this.listaUsuarios = resultado;
        }
      );
  }

  abrirPerfil(id:string){
    localStorage.setItem('idUsuario', id)
    console.log(localStorage.getItem('idUsuario'))
    this.router.navigate(['/perfil-usuario']);
  }

}
