import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimeModule } from './prime.module';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { PacienteModule } from './pages/pacientes/paciente/paciente.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComponentsModule } from './components/components.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    /* LoginComponent,
    RegisterComponent */
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
  ],
  providers: [
    AngularFirestore,
  ],
  exports: [
    NavbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
