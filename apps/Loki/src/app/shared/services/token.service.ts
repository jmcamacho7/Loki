import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class tokenService {
  constructor(private http: HttpClient, private cookies: CookieService) {}
  setToken(token: any) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }
}
