import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimeModule } from './prime.module';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from 'src/environments/environment';
import { PacienteModule } from './pages/pacientes/paciente/paciente.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComponentsModule } from './components/components.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DoctorModule } from './pages/doctores/doctor/doctor.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PrimeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    PacienteModule,
    ComponentsModule,
    DoctorModule,
    PipesModule,
    AngularFireStorageModule,
  ],
  providers: [
    AngularFirestore,
    /* {
      // provide: StorageBucket,
      useValue: 'gs://sistema-unipalido.appspot.com'
    } */
  ],
  exports: [
    NavbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
