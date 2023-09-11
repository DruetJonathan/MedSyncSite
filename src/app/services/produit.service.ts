import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitDTO, ProduitForm} from "../Models/Produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  url: string = "http://localhost:8080/produits";

  constructor(private _httpClient : HttpClient) {
  }

  getAllProduits():Observable<ProduitDTO[]>{
    return this._httpClient.get<ProduitDTO[]>(this.url)
}

  getProduitById(id:number):Observable<ProduitDTO>{
    return this._httpClient.get<ProduitDTO>(`${this.url}/${id}`)
  }

  addProduit(produit:ProduitForm):Observable<ProduitForm>{
    return this._httpClient.post<ProduitForm>(this.url+"/add",produit);
  }

  updateProduit(id:number,produit:ProduitDTO):Observable<ProduitDTO>{
    return this._httpClient.put<ProduitDTO>(`${this.url}/${id}`,produit);
  }

  removeProduit(id:number):Observable<String>{
    return this._httpClient.delete<String>(`${this.url}/${id}`);
  }
}
