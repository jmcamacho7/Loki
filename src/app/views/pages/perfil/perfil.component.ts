import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  perfil: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const token: string | null = localStorage.getItem('token')
    console.log('mi usuario token: ',token)
    const headers = new HttpHeaders({'apikey': token!} )

    this.http.get("http://localhost:8000/api/usuario/mi-usuario", {headers})
      .subscribe(
        resultado => {
          this.perfil = resultado;
        }
      );
    console.log(this.perfil)
  }
}
