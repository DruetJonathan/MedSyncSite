import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../services/produit.service";
import {AuthService} from "../../services/auth.service";
import {DemandeService} from "../../services/demande.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {administratifLink, medecinLink} from "../../Models/Link";
import {UserDTO, UserFull} from "../../Models/User";
import {Observable} from "rxjs";
import {SalleService} from "../../services/salle.service";
import {SalleDTO} from "../../Models/Salle";

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.scss']
})
export class SallesComponent implements OnInit{

  entityForm: FormGroup;
  modificationForm: FormGroup;
  connectedUser: UserFull | undefined;
  userSubject! : Observable<UserDTO>;
  sallesList!:SalleDTO[];

  constructor(private _router:Router,private _produitServ:ProduitService,private _authServ:AuthService, private _demandeServ:DemandeService, private _salleServ:SalleService, private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      etage: ['', Validators.required],
      numeroSalle: ['', Validators.required],
    });

    this.modificationForm = this.fb.group({
      id: ['', Validators.required],
      etage: ['', Validators.required],
      numeroSalle: ['', Validators.required],
    });
  }

  ngOnInit() {

    this._authServ._authSubject$.subscribe((auth) => {
      this.userSubject = this._authServ.getUserFullDTOSubject(auth?.id!)
      this.connectedUser = auth
      const medecinItems = medecinLink;
      const administratifItems = administratifLink;

      this.getSalles();
    });
  }
    getSalles(): void {
    this._salleServ.getAllSalles().subscribe(
      (list) => {
        this.sallesList = list;
      }
    )}

}
