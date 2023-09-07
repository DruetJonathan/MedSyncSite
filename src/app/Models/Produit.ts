import {Demande} from "./Demande";

export interface Produit {
  id: number;
  libele: string;
  quantite: number;
  dateExpiration: Date;
  demandes: Demande[];
}
export interface ProduitForm {
  libele: string;
  quantite: number;
  dateExpiration: Date;
}
