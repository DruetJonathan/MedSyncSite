import {Component, OnInit} from '@angular/core';
import {MenuItem, Message} from "primeng/api";
import {UserDTO, UserFull} from "../../Models/User";
import {AuthService} from "../../services/auth.service";
import { medecinLink } from '../../Models/Link';
import { administratifLink } from '../../Models/Link';
import {Demande} from "../../Models/Demande";
import {DemandeService} from "../../services/demande.service";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProduitDTO} from "../../Models/Produit";
import {ProduitService} from "../../services/produit.service";
import {Machine} from "../../Models/Machine";
import {Router} from "@angular/router";
import {RendezVous} from "../../Models/RendezVous";
import {RendezvousService} from "../../services/rendezvous.service";
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit{
  items: MenuItem[] | undefined;
  demandesUser!: Demande[];
  userSubject! : Observable<UserDTO>;
  activeItem: MenuItem | undefined;
  connectedUser: UserFull | undefined;
  entityForm: FormGroup;
  produitsList!:ProduitDTO[];
  messages!: Message[];
  rendezvous!: RendezVous[];

  constructor(private _router:Router,private _produitServ:ProduitService,private _authServ:AuthService, private _demandeServ:DemandeService,private fb: FormBuilder,private _rendezvousServ:RendezvousService) {
    this.entityForm = this.fb.group({
      produitIds: [[], Validators.required],
      duree: ['', [Validators.required,Validators.min(0)]],
      demandeur: [this.connectedUser?.id, Validators.required],
      machine: ['',Validators.required] // Si vous souhaitez également inclure le champ machine
    });
  }
  ngOnInit() {

    this._authServ._authSubject$.subscribe( (auth) => {
      this.userSubject = this._authServ.getUserFullDTOSubject(auth?.id!)
      this.connectedUser = auth
      const medecinItems = medecinLink;
      const administratifItems = administratifLink;

      this.getProduits();
      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      if (this.connectedUser?.role === 'MEDECIN') {
        this.items = medecinItems;
      } else {
        this.items = administratifItems;
      }
      this.activeItem = this.items[0];
      this.getDemandes();
      this.getRendezvous()
      this.entityForm.get('demandeur')?.setValue(this.connectedUser?.id);
      console.log(auth)
    } );



  }

  getDemandes() {
    this._demandeServ.getSpecificDemandeForUser(this.connectedUser?.id!).subscribe(
      (value:Demande[]) => {
        this.demandesUser = value
        console.log(value)
      }
    )
  }

  getProduits() {
    this._produitServ.getAllProduits().subscribe(
      (value:ProduitDTO[]) => {
        this.produitsList = value
        console.log(value)
      }
    )
  }
  addForm(){
    if (this.entityForm.valid)
      console.log(this.entityForm.value)
      this._demandeServ.addDemande(this.entityForm.value).subscribe(
        ()=>{
          this.getDemandes();
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'Ajout de la demande sans erreur' }];

        }
      );
    this.entityForm.reset()
    this.entityForm.get('demandeur')?.setValue(this.connectedUser?.id);


  }
  getRendezvous() {
    this._rendezvousServ.getSpecificRendezVous(this.connectedUser?.id!).subscribe(
      (value:RendezVous[]) => {
        this.rendezvous = value
        // console.log(value)
      }
    )
  }
  protected readonly Object = Object;
  protected readonly Machine = Machine;

}

