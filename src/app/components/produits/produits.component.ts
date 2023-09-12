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
import {Produit, ProduitDTO} from "../../Models/Produit";
import {PaginatorState} from "primeng/paginator";

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
  modificationForm: FormGroup;
  produitsList!:ProduitDTO[];
  messages!: Message[];
  toggleDivModification : Boolean = false;
  constructor(private _router:Router,private _produitServ:ProduitService,private _authServ:AuthService, private _demandeServ:DemandeService,private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      libele: ['', Validators.required],
      quantite: ['', [Validators.required,Validators.min(0)]],
      dateExpiration: [null, Validators.required],
    });
    this.modificationForm = this.fb.group({
      id: ['', Validators.required],
      libele: [, Validators.required],
      quantite: ['', [Validators.required,Validators.min(0)]],
      dateExpiration: ['', Validators.required],
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
        (list) =>{
          this.produitsList = list;
        }
      );

  }
  addForm() {
    console.log(this.entityForm.value)
    if (this.entityForm.valid) {
      console.log(this.entityForm.value)
      this.entityForm.get('dateExpiration')?.setValue(new Date(this.entityForm.get('dateExpiration')?.value));

      this._produitServ.addProduit(this.entityForm.value).subscribe(
        () => {
          this.getProduits();
          this.messages = [{severity: 'success', summary: 'Success', detail: 'Ajout du produit sans erreur'}];

        }
      );
      this.entityForm.reset()
    }
  }
  deleteProduct(id: number) {
    this._produitServ.removeProduit(id).subscribe(
      () =>{
        this.getProduits();
      }
    )
  }

  toggleModificationScreenForLoadingDiv(produit: ProduitDTO) {
    this.toggleModificationScreen();
    this.modificationForm.reset();
    // FAUT FORMATTER LA DATE CAR DATE DE BASE EN ISO ,.. ET HTML NE RECONNAIS PAS CA
    const dateExpiration = new Date(produit.dateExpiration);
    const formattedDate = `${dateExpiration.getFullYear()}-${(dateExpiration.getMonth() + 1).toString().padStart(2, '0')}-${dateExpiration.getDate().toString().padStart(2, '0')}`;

    // Remplir le formulaire de modification avec la date formatée
    this.modificationForm.patchValue({
      id: produit.id,
      libele: produit.libele,
      quantite: produit.quantite,

      dateExpiration: formattedDate, // Assurez-vous que la valeur est une instance Date
    });
  }
  toggleModificationScreen(){
    this.toggleDivModification = !this.toggleDivModification;


  }
  modificationProduit() {
    if (this.modificationForm.valid) {

      this._produitServ.updateProduit(this.modificationForm.get('id')?.value, this.modificationForm.value).subscribe(
        () => {
          this.getProduits();
        }
      );
    }
    this.toggleModificationScreen()
  }
  searchTerm: string = '';
  filterProducts(): ProduitDTO[] {
    if (!this.searchTerm.trim()) {
      // Si le terme de recherche est vide, retournez la liste complète.
      return this.produitsList;
    }

    // Filtrer les produits dont le libellé contient le terme de recherche (insensible à la casse).
    return this.produitsList.filter(produit =>
      produit.libele.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

 }
