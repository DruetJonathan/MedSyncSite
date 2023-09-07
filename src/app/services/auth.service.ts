import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserFull} from "../Models/User";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "localhost:8080/login";
  private readonly AUTH_KEY = 'auth';
  private _authSubject$: BehaviorSubject<UserFull | undefined>
  constructor(private _httpClient : HttpClient) {
    this._authSubject$ = new BehaviorSubject<UserFull | undefined>(this.authData)
  }
  get authData(): UserFull | undefined {
    const authDataString = sessionStorage.getItem(this.AUTH_KEY)
    if( !authDataString )
      return undefined;

    return JSON.parse(authDataString)
  }
  getLogin(){
    return sessionStorage.getItem(this.AUTH_KEY);
  }

  logout() {
    sessionStorage.removeItem(this.AUTH_KEY)
    this._authSubject$.next( this.authData )
  }
  login(login:FormGroup):Observable<UserFull>{
    return this._httpClient.post<UserFull>(this.url,login).pipe(
      tap( data => {
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(data))
        this._authSubject$.next( this.authData )
      } )
    );
  }
}
