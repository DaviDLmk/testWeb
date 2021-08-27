import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

    jwtToken: string = "";

    constructor() { }

    // Interception de toutes les requêtes
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Modification de la requête pour ajouter le header Authorization (token jwt)
        if (this.jwtToken != "") {
            req = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` } });
        }

        // Retourne la requête en interceptant les résultats pour intercepter le token jwt renvoyé par le serveur
        return next.handle(req).pipe(tap(
            (evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    let tab: Array<string>;
                    let enteteAuthorization = evt.headers.get("Authorization");
                    if (enteteAuthorization != null) {
                        tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                        if (tab.length > 1) {
                            this.jwtToken = tab[1];
                        }
                    }
                }
            },
            (error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        this.jwtToken = "";
                        break;
                }
                return of(null);
            }
        ));
    }
}