import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { RegistrarSintomasModel } from '../models/registrar-sintomas.model';
import { map } from 'rxjs/operators';
import { RecetaModel } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private registrosCollection: AngularFirestoreCollection<RegistrarSintomasModel>;
  private recetaCollection: AngularFirestoreCollection<RecetaModel>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.registrosCollection = afs.collection<RegistrarSintomasModel>('registros');
    this.recetaCollection = afs.collection<RecetaModel>('recetas');
  }

  saveRegistro(registro: RegistrarSintomasModel){
    localStorage.setItem('registro', JSON.stringify(registro));
  }

  getRegistro(): RegistrarSintomasModel{
    return JSON.parse(localStorage.getItem('registro')?? '') as RegistrarSintomasModel;
  }

  clearRegistro(){
    localStorage.removeItem('registro');
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

  generarReceta(receta: RecetaModel){
    return this.recetaCollection.add(receta);
  }
}
