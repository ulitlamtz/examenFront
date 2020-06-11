import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import {
  RegistroComponent,
  ExampleHeader,
} from './components/registro/registro.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AgendaServiceService } from './services/agenda-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AgendaComponent,
    RegistroComponent,
    MainNavComponent,
    ExampleHeader,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AgendaServiceService],
  bootstrap: [AppComponent],
  entryComponents: [ExampleHeader],
})
export class AppModule {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
