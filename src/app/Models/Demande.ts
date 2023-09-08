import {User, UserDTO} from "./User";
import {Machine} from "./Machine";
import {RendezVous} from "./RendezVous";
import {Produit, ProduitDTO} from "./Produit";

export interface Demande {
  id: number;
  produits: ProduitDTO[];
  duree: number;
  demandeur: UserDTO;
  machine: Machine;
  rendezVous: RendezVous;
}
export interface DemandeForm {
  produitIds: number[];
  duree: number;
  demandeur: number;
  machine: Machine;
}
