import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface getTokenAPIResponse { success: boolean }


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(login: string, password: string) : Observable<getTokenAPIResponse> {

    // Création du body de la requête 
    const body: URLSearchParams = new URLSearchParams();
    body.set('login', login);
    body.set('password', password);

    // Envoi de la requête 
    const response = this.http.post<getTokenAPIResponse>(environment.authAPI+"login", body.toString(),
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      });
    return response
  }
}