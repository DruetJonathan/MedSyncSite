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
import {Salle, SalleDTO} from "../../Models/Salle";
import {MenuItem, Message} from "primeng/api";
import {ProduitDTO} from "../../Models/Produit";
import {Machine} from "../../Models/Machine";

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
  messages!: Message[];
  toggleDivModification : Boolean = false;
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(private _router:Router,private _produitServ:ProduitService,private _authServ:AuthService, private _demandeServ:DemandeService, private _salleServ:SalleService, private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      etage: ['', [Validators.required,Validators.min(0)]],
      numeroSalle: ['', [Validators.required,Validators.min(0)]],
      machine: ['', Validators.required],
      rendezVous: [[]],
    });

    this.modificationForm = this.fb.group({
      id: ['', Validators.required],
      etage: ['', Validators.required],
      numeroSalle: ['', Validators.required],
      machine: ['', Validators.required],
    });
  }

  ngOnInit() {

    this._authServ._authSubject$.subscribe((auth) => {
      this.userSubject = this._authServ.getUserFullDTOSubject(auth?.id!)
      this.connectedUser = auth
      const medecinItems = medecinLink;
      const administratifItems = administratifLink;

      this.getSalles();
      if (this.connectedUser?.role === 'MEDECIN') {
        this.items = medecinItems;
      } else {
        this.items = administratifItems;
      }
      this.activeItem = this.items[0];
    });
  }
    getSalles(): void {
    this._salleServ.getAllSalles().subscribe(
      (list) => {
        this.sallesList = list;
      }
    )}
  addForm() {
    console.log(this.entityForm.value)
    if (this.entityForm.valid) {
      console.log(this.entityForm.value)
      this._salleServ.addSalle(this.entityForm.value).subscribe(
        () => {
          this.getSalles();
          this.messages = [{severity: 'success', summary: 'Success', detail: 'Ajout du produit sans erreur'}];

        }
      );
      this.entityForm.reset()
    }
  }
  deleteSalle(id: number) {
    this._salleServ.removeSalle(id).subscribe(
      () =>{
        this.getSalles();
      }
    )
  }
  toggleModificationScreenForLoadingDiv(salle: SalleDTO) {
    this.toggleModificationScreen();
    this.modificationForm.reset();
    this.modificationForm.patchValue({
      id: salle.id,
      etage: salle.etage,
      machine: salle.machine,
      numeroSalle: salle.numeroSalle,
      rendezVous:salle.rendezVous,

    });
  }
  toggleModificationScreen(){
    this.toggleDivModification = !this.toggleDivModification;


  }

  modificationSalle() {
    if (this.modificationForm.valid) {

      this._salleServ.updateSalle(this.modificationForm.get('id')?.value, this.modificationForm.value).subscribe(
        () => {
          this.getSalles();
        }
      );
    }
    this.toggleModificationScreen()
  }
  searchTerm: string = '';
  filterSalle(): SalleDTO[] {
    if (!this.searchTerm.trim()) {
      // Si le terme de recherche est vide, retournez la liste complète.
      return this.sallesList;
    }

    // Filtrer les produits dont le libellé contient le terme de recherche (insensible à la casse).
    return this.sallesList.filter(salle =>
      salle.machine.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  protected readonly Machine = Machine;
  protected readonly Object = Object;
}
