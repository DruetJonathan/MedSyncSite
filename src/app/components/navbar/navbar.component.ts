import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User, UserFull} from "../../Models/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isConnected: boolean = false;
  connectedUser: UserFull | undefined;
  constructor(private _authServ:AuthService,private _router:Router,private _userServ:UserService) {
  }

  getLogin(){
    return this.isConnected;
  }

  ngOnInit(): void {
    this._authServ._authSubject$.subscribe( (auth) => {
      this.isConnected = auth !== undefined;
      this.connectedUser = auth;
      console.log(auth)
    } );
  }

  logout() {
    console.log(this.getLogin())
    this._authServ.logout();
    this._router.navigate(['/']);
  }
}
