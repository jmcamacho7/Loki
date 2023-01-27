import { Component } from '@angular/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent {

  login: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:8000/login/list")
      .subscribe(
        resultado => {
          this.login = resultado;
        }
      );
  }


  pruebacirculo (){
    const circulo:any = document.getElementById('circle')
    circulo.style.display = "none";
  }
  aparecercirculo(){
    const circulo:any = document.getElementById('circle')
    var tipoDisplay = circulo.style.display;
    document.write(tipoDisplay);
  }

  mensajeJSON(){
    let elemento:any = document.getElementById('name');
    const mensaje = elemento.value;

    var http = new XMLHttpRequest();
    var url = "http://localhost:8000/";

    const data = { mensaje:[mensaje]};
    const jsonData = JSON.stringify(data);
    const jsonFinal = JSON.parse(jsonData);



  }




}
