import {Machine} from "./Machine";
import {RendezVous} from "./RendezVous";

export interface Salle {
  id: number;
  etage: number;
  numeroSalle: string;
  machine: Machine;
  rendezVous: RendezVous[];
}
export interface SalleForm {
  etage: number;
  numeroSalle: string;
  machine: Machine;
  rendezVous: number[];
}
