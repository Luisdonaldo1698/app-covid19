import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { RegistrosComponent } from '../registros/registros.component';
import { ComponentsModule } from '../../../components/components.module';
import { PrimeModule } from 'src/app/prime.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    DoctorComponent,
    RegistrosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DoctorRoutingModule,
    PrimeModule,
    ComponentsModule,
    PipesModule,
  ]
})
export class DoctorModule { }
