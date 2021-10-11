import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AlertService } from './alert.service';
import { map } from 'rxjs/operators'
import { Roles } from '../models/userRol.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel | undefined;

  // users: Observable<UserModel>;
  private userCollection: AngularFirestoreCollection<UserModel>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.userCollection = afs.collection<UserModel>('users');
  }

  login(email: string, password: string){
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

  SignOut() {
    return this.angularFireAuth.signOut();
  }

  checkAuthentication(rol: Roles): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.angularFireAuth.authState.subscribe(user => {
        if(user && user.uid){
          this.getUser(user.uid).subscribe((resp: UserModel[]) => {
            if(resp.length > 0){
              this.user = resp[0];
              const condicion = this.user.rol === rol;
              if(!condicion){
                this.router.navigate([`/${this.user.rol.substring(0,1)}`], {replaceUrl: true});
              }
              resolve(condicion);
            }
            reject();
          });
        }
      },err => {
        reject(err);
      });
    });
  }

  getUser(uid: string){
    this.userCollection = this.afs.collection<UserModel>('users', ref => ref.where('id', '==', uid));
    return this.userCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const datos = a.payload.doc.data() as UserModel;
          const id = a.payload.doc.id;
          return { id, ... datos }
        })
      )
    );
  }

}
