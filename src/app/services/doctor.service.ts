import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { RegistrarSintomasModel } from '../models/registrar-sintomas.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private registrosCollection: AngularFirestoreCollection<RegistrarSintomasModel>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.registrosCollection = afs.collection<RegistrarSintomasModel>('registros');
  }

  listarRegistros(fecha: string){
    this.registrosCollection = this.afs.collection<RegistrarSintomasModel>('registros', ref => ref.where('fecha', '==', fecha));
    return this.registrosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const datos = a.payload.doc.data() as RegistrarSintomasModel;
          const id = a.payload.doc.id;
          return { id, ... datos }
        })
      )
    );
  }
}
