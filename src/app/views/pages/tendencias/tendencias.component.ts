import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TendenciasService} from "./tendencias.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})

export class TendenciasComponent implements OnInit{
  tag: any;

  constructor(private http: HttpClient, private service:TendenciasService, private router: Router) { }

  refreshPage() {
    location.reload();
  }



  ngOnInit() {
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})

    this.http.get("http://localhost:8000/api/tags/listar", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.publicacion = resultado;
          console.log(this.tag);
        }
      );
    this.http.get("http://localhost:8000/api/tags/listar", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore
          this.tag = resultado.reverse();
          // @ts-ignore

          console.log(this.tag);
        }
      );

  }

  verTodas(){
    const todas:any = document.getElementById('todas')
    const amigos:any = document.getElementById('tag')
    amigos.style.display = 'none'
    todas.style.display = 'block'
  }

}
