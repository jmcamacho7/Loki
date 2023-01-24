import { Component } from '@angular/core';
import {style} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  botonprueba(){
    document.write('estoy hasta la polla')
  }
}




