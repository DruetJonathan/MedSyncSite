import {Role} from "./Role";
import {RendezVous} from "./RendezVous";
import {Demande} from "./Demande";

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthdate: Date;
  numeroTelephone: string;
  role: Role;
  demandes: Demande[];
  rendezVous: RendezVous[];
}

export interface UserFull {
  token:string,
  user:User
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserRegister {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthdate: Date;
  role: Role;
  numeroTelephone: string;
}
