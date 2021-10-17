import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { PacienteRegistrosComponent } from '../paciente-registros/paciente-registros.component';
import { RegistrarSintomasComponent } from '../registrar-sintomas/registrar-sintomas.component';

const routes: Routes = [
  {
    path: '',
    component: PacienteComponent,
    children: [
      {
        path: '',
        component: PacienteRegistrosComponent,
      },
      {
        path: 'nuevo',
        component: RegistrarSintomasComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
