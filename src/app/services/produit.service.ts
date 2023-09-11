import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitDTO} from "../Models/Produit";

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
}
