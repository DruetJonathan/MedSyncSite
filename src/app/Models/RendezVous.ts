import {Demande} from "./Demande";
import {User} from "./User";
import {Salle} from "./Salle";

export interface RendezVous {
  id: number;
  dateDebut: Date;
  dateFin: Date;
  demande: Demande;
  creePar: String;
  salle: Salle;
  }
export interface RendezVousForm {
  dateDebut: Date;
  dateFin: Date;
  idUser: number;
  salle: number;
  demande: number;
}
