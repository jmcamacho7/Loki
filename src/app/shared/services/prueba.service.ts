import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest.service";
import {AuthResponse} from "../models/auth.response";
import {AuthRequest} from "../models/auth.request";


@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private restService : RestService
  constructor(private http: HttpClient, restService: RestService) {
    this.restService = restService
  }

  login(data: AuthRequest) {
    const observable = this.restService.post<AuthResponse, AuthRequest>(`http://localhost:8000/login`, data)

    observable.subscribe(
      (data) => localStorage.setItem("token", data.token)

    );
    return observable;

  }
}
