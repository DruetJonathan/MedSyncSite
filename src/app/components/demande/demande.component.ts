import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserFull} from "../../Models/User";
import {AuthService} from "../../services/auth.service";
import { medecinLink } from '../../Models/Link';
import { administratifLink } from '../../Models/Link';
import {Demande} from "../../Models/Demande";
import {DemandeService} from "../../services/demande.service";
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent {
  items: MenuItem[] | undefined;
  demandesUser!: Demande[];
  isConnected: boolean = false;

  activeItem: MenuItem | undefined;
  connectedUser: UserFull | undefined;
  constructor(private _authServ:AuthService, private _demandeServ:DemandeService) {
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
    this.activeItem = this.items[0]
    // get demande
    this.getDemandes();
  }
  getDemandes() {
    this._demandeServ.getSpecificDemandeForUser(this.connectedUser?.id!).subscribe(
      (value:Demande[]) => {
        this.demandesUser = value
        console.log(value)
      }
    )
  }

  protected readonly console = console;
}

