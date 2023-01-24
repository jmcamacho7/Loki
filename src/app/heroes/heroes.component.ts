import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  pruebacirculo (){
    const circulo:any = document.getElementById('circle')
    circulo.style.display = "none";
  }
  aparecercirculo(){
    const circulo:any = document.getElementById('circle')
    var tipoDisplay = circulo.style.display;
    document.write(tipoDisplay);


  }
}
