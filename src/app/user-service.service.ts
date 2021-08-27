import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface getInfoAPIResponse { success: boolean, user: { id: number, login: string, email: string } }


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getInfo(): Observable<getInfoAPIResponse> {
    return this.http.get<getInfoAPIResponse>(environment.userAPI + "user");
  }
}