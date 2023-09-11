import {Component, OnInit} from '@angular/core';
import {MenuItem, Message} from "primeng/api";
import {administratifLink, medecinLink} from "../../Models/Link";
import {Router} from "@angular/router";
import {ProduitService} from "../../services/produit.service";
import {AuthService} from "../../services/auth.service";
import {DemandeService} from "../../services/demande.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Demande} from "../../Models/Demande";
import {Observable} from "rxjs";
import {UserDTO, UserFull} from "../../Models/User";
import {ProduitDTO} from "../../Models/Produit";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit{

  items: MenuItem[] | undefined;
  demandesUser!: Demande[];
  userSubject! : Observable<UserDTO>;
  activeItem: MenuItem | undefined;
  connectedUser: UserFull | undefined;
  entityForm: FormGroup;
  produitsList!:ProduitDTO[];
  messages!: Message[];

  constructor(private _router:Router,private _produitServ:ProduitService,private _authServ:AuthService, private _demandeServ:DemandeService,private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      libele: [[], Validators.required],
      quantite: ['', [Validators.required,Validators.min(0)]],
      dateExpiration: [null, Validators.required],
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
      console.log(auth)
    } );
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
    console.log(this.entityForm.value)
    if (this.entityForm.valid)
      console.log(this.entityForm.value)
    this._produitServ.addProduit(this.entityForm.value).subscribe(
      ()=>{
        this.getProduits();
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];

      }
    );
    this.entityForm.reset()
  }
}
