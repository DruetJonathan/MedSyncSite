import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PanelComponent} from "./components/panel/panel.component";
import {DemandeComponent} from "./components/demande/demande.component";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ProduitsComponent} from "./components/produits/produits.component";
import {AccesDeniedComponent} from "./components/acces-denied/acces-denied.component";
import {authGuard} from "./guard/auth.guard";
import {authMedecinGuard} from "./guard/auth-medecin.guard";
import {authAdministratifGuard} from "./guard/auth-administratif.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {SallesComponent} from "./components/salles/salles.component";
import {RendezVousComponent} from "./components/rendez-vous/rendez-vous.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"panel",component:PanelComponent,canActivate:[authGuard]},
  {path:"demandes",component:DemandeComponent, canActivate:[authMedecinGuard]},
  {path:"salles",component:SallesComponent, canActivate:[authAdministratifGuard]},
  {path:"produits", component: ProduitsComponent, canActivate:[authAdministratifGuard]},
  {path:"rendezvous", component: RendezVousComponent, canActivate:[authAdministratifGuard]},
  {path:"accesDenied", component: AccesDeniedComponent},
  {path:"**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ]
})
export class AppRoutingModule { }
