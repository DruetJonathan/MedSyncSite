import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {SharedModule} from "./shared/shared.module";
import { PanelComponent } from './components/panel/panel.component';
import {TabMenuModule} from "primeng/tabmenu";
import { DemandeComponent } from './components/demande/demande.component';
import {TabViewModule} from "primeng/tabview";
import {MessagesModule} from "primeng/messages";
import { ProduitsComponent } from './components/produits/produits.component';
import {ButtonModule} from "primeng/button";
import {DateFormatPipe} from "./pipe/date-format.pipe";
import {CommonModule} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PanelComponent,
    DemandeComponent,
    ProduitsComponent,
    DateFormatPipe,
  ],
    imports: [
        SharedModule,
        TabMenuModule,
        TabViewModule,
        MessagesModule,
        ButtonModule,
        CommonModule,
        PaginatorModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
