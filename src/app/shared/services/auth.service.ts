import {Injectable} from "@angular/core";
import {RestService} from "./rest.service";
import {AuthRequest} from "../models/auth.request";
import {AuthResponse} from "../models/auth.response";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly url = '127.0.0.1:8000'
  private restService: RestService;

  constructor(restService: RestService, private http: HttpClient) {
    this.restService = restService;
  }



  login(data: AuthRequest) {
    const headers = new HttpHeaders()
    const params = new HttpParams();
    const observable = this.http.post<AuthResponse>('http://localhost:8000/login', data, {headers: headers, params: params})

    observable.subscribe(
      (data) =>
        localStorage.setItem("token", data.token.toString())

    );
    return observable;

  }

  logout() {

  }
}
