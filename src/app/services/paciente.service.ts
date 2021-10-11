import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { RegistrarSintomasModel } from '../models/registrar-sintomas.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private registrosCollection: AngularFirestoreCollection<RegistrarSintomasModel>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.registrosCollection = afs.collection<RegistrarSintomasModel>('registros');
  }

  registrarSintomas(sintomas: RegistrarSintomasModel){
    return this.registrosCollection.add(sintomas)
  }
}
