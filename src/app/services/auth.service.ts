import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // users: Observable<UserModel>;
  private userCollection: AngularFirestoreCollection<UserModel>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertService: AlertService,
  ) {
    this.userCollection = afs.collection<UserModel>('users');
  }

  login(email: string, password: string){0
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async signUp(user: UserModel){
    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password!).then(resp => {
      console.log(resp);
      if(resp && resp.user && resp.user.uid){
        const userId = resp.user?.uid;
        user.id = userId;
        delete user.password;
        this.userCollection.add(user).then(r => {
          console.log(r);
          this.alertService.showAlert('Usuario creado', 'Usuario registrado correctamente', 'success');
        }).catch(err => {
          this.alertService.showAlert('Error', err, 'error');
        });
        return true;
      }
      return false;
    }).catch(err => {
      console.log(err);
      this.alertService.showAlert('Error', err, 'error');
    });
  }
}
