import { Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { RegistroComponent } from './components/registro/registro.component';

export const ROUTES: Routes = [
  { path: 'agenda', component: AgendaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', pathMatch: 'full', redirectTo: 'agenda' },
  { path: '**', pathMatch: 'full', redirectTo: 'agenda' },
];
