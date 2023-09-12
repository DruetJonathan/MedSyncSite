import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {UserDTO, UserFull} from "../Models/User";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://localhost:8080/login";
  private readonly AUTH_KEY = 'auth';
  _authSubject$: BehaviorSubject<UserFull | undefined>
  constructor(private _httpClient : HttpClient, private _userServ: UserService) {
    this._authSubject$ = new BehaviorSubject<UserFull | undefined>(this.authData)
    this.isloggedIn=false;

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
    console.log(login.value)
    this.isloggedIn = true;

    return this._httpClient.post<UserFull>(this.url,login).pipe(
      tap( data => {
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(data))
        this._authSubject$.next( this.authData )
      } )
    );
  }
  getUserFullDTOSubject(id:number):Observable<UserDTO>{
    return this._userServ.getOne(id);
}
  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  getRoleUser():string{
    return this.authData?.role!;
  }

  private isloggedIn: boolean;

}
