import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {SharedModule} from "./shared/shared.module";
import { PanelComponent } from './components/panel/panel.component';
import {TabMenuModule} from "primeng/tabmenu";
import { DemandeComponent } from './components/demande/demande.component';
import {TabViewModule} from "primeng/tabview";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PanelComponent,
    DemandeComponent,
  ],
  imports: [
    SharedModule,
    TabMenuModule,
    TabViewModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
