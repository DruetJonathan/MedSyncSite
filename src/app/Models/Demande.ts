import {User} from "./User";
import {Machine} from "./Machine";
import {RendezVous} from "./RendezVous";
import {Produit} from "./Produit";

export interface Demande {
  id: number;
  produits: Produit[];
  duree: number;
  demandeur: User;
  machine: Machine;
  rendezVous: RendezVous;
}
export interface DemandeForm {
  produitIds: number[];
  duree: number;
  demandeur: number;
  machine: Machine;
}
