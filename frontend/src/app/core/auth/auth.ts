import { Service } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DefaultResponseType } from '../../../types/default-response.type';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../environments/enviroments';

@Service({
  providedIn: 'root',
})
export class AuthService {
  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(
    email: string,
    password: string,
    rememberMe: boolean,
  ): Observable<DefaultResponseType | loginResponseType> {
    return this.https.post<DefaultResponseType | loginResponseType>(enviroments.api + 'login', {
      email,
      password,
      rememberMe,
    });
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }

  public setTokens(accessTokens: string, refreshTokens: string) {
    localStorage.setItem(this.accessTokenKey, accessTokens);
    localStorage.setItem(this.refreshTokenKey, refreshTokens);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens() : {accesToken: string | null, refreshToken: string | null} {
    return {
      accesToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: null | string) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }
}
