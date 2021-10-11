import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctoresRoutingModule } from './doctores-routing.module';
import { DoctoresComponent } from './doctores.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    DoctoresComponent
  ],
  imports: [
    CommonModule,
    DoctoresRoutingModule,
    ComponentsModule,
  ]
})
export class DoctoresModule { }
