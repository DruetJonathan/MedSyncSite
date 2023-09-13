import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {administratifLink, medecinLink} from "../../Models/Link";
import {UserDTO, UserFull} from "../../Models/User";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ProduitService} from "../../services/produit.service";
import {AuthService} from "../../services/auth.service";
import {DemandeService} from "../../services/demande.service";
import {SalleService} from "../../services/salle.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RendezvousService} from "../../services/rendezvous.service";
import {Demande, DemandeForm} from "../../Models/Demande";
import {RendezVous} from "../../Models/RendezVous";
import {SalleDTO} from "../../Models/Salle";
import {Machine} from "../../Models/Machine";
@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit{
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  connectedUser: UserFull | undefined;
  userSubject! : Observable<UserDTO>;
  rendezvous!: RendezVous[];
  demandesUserAttente!: Demande[];
  entityForm: FormGroup;
  toggleDivModification : Boolean = false;

  constructor(private _salleServ: SalleService,private _router:Router,private _rendezvousServ:RendezvousService,private _authServ:AuthService, private _demandeServ:DemandeService, private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      dateDebut:['',[Validators.required]],
      dateFin:['',[Validators.required]],
      idUser:['',[Validators.required]],
      salle:['',[Validators.required]],
      demande:['',[Validators.required]],
    });
  }
    ngOnInit() {

    this._authServ._authSubject$.subscribe((auth) => {
      this.userSubject = this._authServ.getUserFullDTOSubject(auth?.id!)
      this.connectedUser = auth
      const medecinItems = medecinLink;
      const administratifItems = administratifLink;

      this.getRendezvous();
      this.getDemandes();
      if (this.connectedUser?.role === 'MEDECIN') {
        this.items = medecinItems;
      } else {
        this.items = administratifItems;
      }
      this.activeItem = this.items[0];
    });
  }

  getRendezvous() {
    this._rendezvousServ.getAllRendezvous().subscribe(
      (value:RendezVous[]) => {
        this.rendezvous = value
        // console.log(value)
      }
    )
  }
  getDemandes() {
    this._demandeServ.getAllDemande().subscribe(
      (value: Demande[]) => {
        this.demandesUserAttente = value.filter(value1 => value1.rendezVous === null);
        console.log(this.demandesUserAttente);
      }
    );
  }
  listSalleDispoForMachine!: Observable<SalleDTO[]>;
  listPossibleDate: Observable<Date[]> | undefined;
  selectedSalle : number = 1;
  demandeCurrent! : Demande;
  toggleModificationScreenForLoadingDiv(demande: Demande) {
    this.entityForm.reset();
    this.demandeCurrent = demande
    // console.log(demande)
    this.listSalleDispoForMachine = this._salleServ.getSalleDisponible(demande.machine)

    this.toggleModificationScreen();

    console.log(this.entityForm.value)
  }
  setSalleSelected(id:number){
    this.selectedSalle = id;
    this.listPossibleDate = this._rendezvousServ.getAvailableTimeSlots(this.selectedSalle,this.demandeCurrent.duree)

    console.log(this.selectedSalle)
  }
  toggleModificationScreen(){
    this.toggleDivModification = !this.toggleDivModification;
  }

  protected readonly Machine = Machine;
  protected readonly Object = Object;

  addRendezVous() {
    let dateDebut = new Date(this.entityForm.get('dateDebut')?.value);
    console.log("date debut avant:"+dateDebut)
    const year2 = dateDebut.getFullYear();
    const month2 = (dateDebut.getMonth() + 1).toString().padStart(2, '0');
    const day2 = dateDebut.getDate().toString().padStart(2, '0');
    const hour2 = dateDebut.getHours().toString().padStart(2, '0');
    const minute2 = dateDebut.getMinutes().toString().padStart(2, '0');
    const second2 = "00";

    const formattedDate2 = `${year2}-${month2}-${day2} ${hour2}:${minute2}:${second2}`;

    this.entityForm.patchValue({
      dateDebut: new Date(formattedDate2),
    })

    console.log(this.entityForm.value)

    this._rendezvousServ.addRendezVous(this.entityForm.value).subscribe(
      () => this.getDemandes()
    );
  }
  idDemande : number = 0;
  updateForm() {
    let dateDebut = this.entityForm.get('dateDebut')?.value;
    const dureeMinutes = this.demandeCurrent.duree;
    let dateFin = new Date(dateDebut);
    dateFin.setMinutes(dateFin.getHours() + dureeMinutes);
    dateFin = this.roundUpToNextHour(dateFin);
    const year = dateFin.getFullYear();
    const month = (dateFin.getMonth() + 1).toString().padStart(2, '0');
    const day = dateFin.getDate().toString().padStart(2, '0');
    const hour = dateFin.getHours().toString().padStart(2, '0');
    const minute = dateFin.getMinutes().toString().padStart(2, '0');
    const second = dateFin.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;


    console.log("fin apres"+formattedDate);

    this.entityForm.patchValue({
      // dateFin: formattedDate,
      dateFin: new Date(formattedDate),

      idUser: this.connectedUser?.id,
      salle: this.selectedSalle,
      demande: this.demandeCurrent.id,
    });

  }



  roundUpToNextHour(date: Date): Date {
    const roundedDate = new Date(date);
    roundedDate.setMinutes(0, 0, 0);
    roundedDate.setHours(roundedDate.getHours() + 1);
    return roundedDate;
  }
}
