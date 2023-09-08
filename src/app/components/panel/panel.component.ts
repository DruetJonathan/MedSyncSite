import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserDTO, UserFull} from "../../Models/User";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {administratifLink, medecinLink} from "../../Models/Link";
import {Observable} from "rxjs";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit{
  items: MenuItem[] | undefined;
  isConnected: boolean = false;

  activeItem: MenuItem | undefined
  //todo regler le probleme que ce n'est pas observable
  connectedUser: UserFull | undefined;
  userProfile : UserDTO | undefined;
  userSubject! : Observable<UserDTO>;
  constructor(private _authServ:AuthService, private _userService: UserService) {

  }
  ngOnInit() {
    this._authServ._authSubject$.subscribe( (auth) => {
      this.userSubject = this._authServ.getUserFullDTOSubject(auth?.id!)
      this.connectedUser = auth
      const medecinItems = medecinLink;
      const administratifItems = administratifLink;
      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      if (this.connectedUser?.role === 'MEDECIN') {
        this.items = medecinItems;
      } else {
        this.items = administratifItems;
      }
      this.activeItem = this.items[0];
      console.log(auth)
    } );



  }
}
