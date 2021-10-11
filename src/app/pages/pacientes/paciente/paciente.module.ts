import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { RegistrarSintomasComponent } from '../registrar-sintomas/registrar-sintomas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../../../prime.module';


@NgModule({
  declarations: [
    PacienteComponent,
    RegistrarSintomasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PacienteRoutingModule,
    PrimeModule,
  ]
})
export class PacienteModule { }
