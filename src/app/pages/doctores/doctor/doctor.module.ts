import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { RegistrosComponent } from '../registros/registros.component';
import { ComponentsModule } from '../../../components/components.module';
import { PrimeModule } from 'src/app/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';
import { CrearRecetaComponent } from '../crear-receta/crear-receta.component';


@NgModule({
  declarations: [
    DoctorComponent,
    RegistrosComponent,
    CrearRecetaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule,
    PrimeModule,
    ComponentsModule,
    PipesModule,
  ],
  // bootstrap: [DoctorComponent],
})
export class DoctorModule { }
