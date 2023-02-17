import { Component } from '@angular/core';
import {style} from "@angular/animations";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HomeService} from "./home.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  publicacion: any;
  foto: any;



  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:8000/api/publicacion/list")
      .subscribe(
        resultado => {
          const reversedArray = [];
          // @ts-ignore
          for(let i = resultado.length - 1; i >= 0; i--){
            // @ts-ignore
            reversedArray.push(resultado[i]);
          }
          this.publicacion = reversedArray;
          console.log(resultado)
        }
      );
  }

}






