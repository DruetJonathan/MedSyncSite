import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserDTO, UserFull} from "../../Models/User";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {administratifLink, medecinLink} from "../../Models/Link";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  items: MenuItem[] | undefined;
  isConnected: boolean = false;

  activeItem: MenuItem | undefined
  //todo regler le probleme que ce n'est pas observable
  connectedUser: UserFull | undefined;
  userProfile : UserDTO | undefined;

  constructor(private _authServ:AuthService, private _userService: UserService) {
  }
  ngOnInit() {
    this._authServ._authSubject$.subscribe( (auth) => {
      this.isConnected = auth !== undefined;
      this.connectedUser = auth;
      console.log(auth)
    } );
    const medecinItems = medecinLink;
    const administratifItems = administratifLink;
    // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
    if (this.connectedUser?.role === 'MEDECIN') {
      this.items = medecinItems;
    } else {
      this.items = administratifItems;
    }
    this.activeItem = this.items[0];

    id: this.connectedUser?.id;

    this.getProfile();

  }

  getProfile() {
    console.log(this.connectedUser?.email)
    this._userService.getOne(this.connectedUser?.id!).subscribe({
      next: (user) => {
        this.userProfile = user;
      }
    })
  }
}
