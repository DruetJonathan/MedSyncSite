import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalleDTO} from "../Models/Salle";
import {getLabelFromValue, Machine} from "../Models/Machine";
@Injectable({
  providedIn: 'root'
})
export class SalleService {

  url: string = "http://localhost:8080/salles";

  constructor(private _httpClient: HttpClient) {
  }

  getAllSalles(): Observable<SalleDTO[]> {
    return this._httpClient.get<SalleDTO[]>(this.url);
  }

  getSalleById(id: number): Observable<SalleDTO> {
    return this._httpClient.get<SalleDTO>(`${this.url}/${id}`);
  }

  addSalle(salle: SalleDTO): Observable<SalleDTO> {
    return this._httpClient.post<SalleDTO>(this.url+"/add", salle);
  }

  updateSalle(id: number, salle: SalleDTO): Observable<SalleDTO> {
    return this._httpClient.put<SalleDTO>(`${this.url}/${id}`, salle);
  }

  removeSalle(id: number): Observable<String> {
    return this._httpClient.delete<String>(`${this.url}/${id}`);
  }

  getSalleDisponible(machine: Machine): Observable<SalleDTO[]> {
    // Utilisez l'objet de correspondance pour obtenir la valeur à envoyer à votre API
    console.log(getLabelFromValue(machine))

    return this._httpClient.get<SalleDTO[]>(`${this.url}/salles-disponibles?machine=${getLabelFromValue(machine)}`);
  }
}
