import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PanelComponent} from "./components/panel/panel.component";
import {DemandeComponent} from "./components/demande/demande.component";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"panel",component:PanelComponent},
  {path:"demandes",component:DemandeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ]
})
export class AppRoutingModule { }
