import { Component } from '@angular/core';
import {style} from "@angular/animations";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  publicacion: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:8000/publicacion/list")
      .subscribe(
        resultado => {
          this.publicacion = resultado;
        }
      );
  }


}




