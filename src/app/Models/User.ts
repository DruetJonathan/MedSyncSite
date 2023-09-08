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
  // token:string,
  // user:User
  id: number,
  email: string,
  role: string,
  token: string
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
export interface UserDTO {
  email: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  numeroTelephone: string;
  role: Role;
}
