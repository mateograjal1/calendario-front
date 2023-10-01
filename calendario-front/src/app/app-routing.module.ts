import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EventosComponent } from './eventos/eventos.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: '', redirectTo: '/calendario', pathMatch: 'full' },
  { path: 'calendario', component: CalendarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
