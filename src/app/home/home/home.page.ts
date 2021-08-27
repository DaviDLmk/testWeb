import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth-service.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  authForm: FormGroup;
  login$?: Observable<Object>;
  error: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {

    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  authentication() {
    const val = this.authForm.value;
    this.error = false;
    // Inserer l'authentification
    this.login$ = this.authService.getToken(val.login, val.password)
    .pipe(
      // Gestion en cas d'erreur (code HTTP différent de 200)
      catchError(err => {
        this.error = true;
        return new Observable<never>();
      })
    );

  }
}
