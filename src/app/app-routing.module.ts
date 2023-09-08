import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PanelComponent} from "./components/panel/panel.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"panel",component:PanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
