import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import {AuthService} from '../../../core/auth/auth';
import { Router } from '@angular/router';
import { LoginResponseType } from '../../../../types/login-response.type';
import { DefaultResponseType } from '../../../../types/default-response.type';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgStyle
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: this.fb.group( {
    email:['', [Validators.email, Validators.required]],
    password:['', [Validators.required]],
    rememberMe:[false],
                            });

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private _snackBar: MatSnackBar,
                private router: Router,
                ) {
    }

  login(): void {
      if(this.loginForm.valid && this.loginForm.value.email
        && this.loginForm.value.password) {
        this.authService.login(this.loginForm.value.email, !!this.loginForm.value.password)
          .subscribe({
            next: (data: LoginResponseType | DefaultResponseType) => {
              let error = null;
              if ((data as DefaultResponseType).error != undefined) {
                error = (data as DefaultResponseType).message;
              }

              const loginResponse = data as LoginResponseType;
              if (!loginResponse.accessToken || (!loginResponse.refreshToken ||
                (!loginResponse.userId) {
                error = 'Ошибка авторизации'
              }

              if (error != null) {
                rhis.snackBar.open(error);
                throw  new Error(error);
              }

              this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
              this.authService.userId = loginResponse.userId;
              this._snackBar.open('Вы успешно авторизовались')
              this.router.navigate(['/']);
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open('Ошибка авторизации');
              }
            }
          })
      }
  }
}
