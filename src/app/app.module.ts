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

@NgModule({
  declarations: [
    AppComponent,
    /* LoginComponent,
    RegisterComponent */
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PrimeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    PacienteModule,
  ],
  providers: [
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
