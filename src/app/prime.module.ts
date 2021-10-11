import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const modules = [
  InputTextModule,
  ButtonModule,
  TableModule,
  ProgressSpinnerModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    modules,
  ]
})
export class PrimeModule { }
