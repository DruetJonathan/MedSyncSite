import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Salle, SalleDTO} from "../Models/Salle";
import {RendezVous, RendezVousForm} from "../Models/RendezVous";
import {Machine} from "../Models/Machine";

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  url: string = "http://localhost:8080/rendezvous";

  constructor(private _httpClient: HttpClient) {
  }

  getAllRendezvous(): Observable<RendezVous[]> {
    return this._httpClient.get<RendezVous[]>(this.url);
  }
  getSpecificRendezVous(id:number): Observable<RendezVous[]> {
    return this._httpClient.get<RendezVous[]>(this.url+"/specificRendezVous/user/"+id);
  }

  getSalleById(id: number): Observable<RendezVous> {
    return this._httpClient.get<RendezVous>(`${this.url}/${id}`);
  }

  addRendezVous(rendezVousForm: RendezVousForm): Observable<RendezVous> {
    console.log("service:"+rendezVousForm.dateDebut)
    console.log("service:"+rendezVousForm.dateFin)
    return this._httpClient.post<RendezVous>(this.url+"/add", rendezVousForm);
  }

  // updateSalle(id: number, salle: RendezVous): Observable<RendezVous> {
  //   return this._httpClient.put<RendezVous>(`${this.url}/${id}`, salle);
  // }
  //
  // removeSalle(id: number): Observable<String> {
  //   return this._httpClient.delete<String>(`${this.url}/${id}`);
  // }
  getAvailableTimeSlots(salleId: number, demandeDuree: number): Observable<Date[]> {
    // Faites une requête à votre API pour obtenir les dates et heures disponibles
    // en fonction de la machineId et de la durée de la demande
    return this._httpClient.get<Date[]>(this.url+`/disponibles?salleId=${salleId}&demandeDuree=${demandeDuree}`);
  }
}
