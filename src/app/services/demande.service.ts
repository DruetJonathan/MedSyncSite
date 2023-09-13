import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserFull} from "../Models/User";
import {Demande, DemandeForm} from "../Models/Demande";
import {DemandeComponent} from "../components/demande/demande.component";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  url: string = "http://localhost:8080/demandes";
  constructor(private _httpClient : HttpClient) {
  }
  getDemandeById(id:number):Observable<Demande>{
    // console.log(id)
    return this._httpClient.get<Demande>(this.url+"/"+id);
  }
  modifyDemande(id:number,demande:Demande):Observable<Demande>{
    // console.log(id)
    return this._httpClient.put<Demande>(this.url+"/"+id,demande);
  }
  deleteDemande(id:number):Observable<String>{
    // console.log(id)
    return this._httpClient.delete<String>(this.url+"/"+id);
  }
  addDemande(demande:DemandeForm):Observable<DemandeForm>{
    // console.log(demande)
    return this._httpClient.post<DemandeForm>(this.url+"/add",demande);
  }
  getAllDemande():Observable<Demande[]>{
    // console.log(id)
    return this._httpClient.get<Demande[]>(this.url);
  }
  getSpecificDemandeForUser(id:number):Observable<Demande[]>{
    // console.log(id)
    return this._httpClient.get<Demande[]>(this.url+"/specificDemande/user/"+id);
  }

}
