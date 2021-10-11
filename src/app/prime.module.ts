import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel'
import {AvatarModule} from 'primeng/avatar';

const modules = [
  InputTextModule,
  ButtonModule,
  TableModule,
  ProgressSpinnerModule,
  ToolbarModule,
  OverlayPanelModule,
  AvatarModule,
]

@NgModule({
  declarations: [],
  imports: [
    modules,
    CommonModule,
  ],
  exports: [
    modules,
  ]
})
export class PrimeModule { }
