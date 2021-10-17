import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
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
  autenticado: boolean = false;

  // users: Observable<UserModel>;
  private userCollection: AngularFirestoreCollection<UserModel>;

  // subscriptions
  authSuscription?: Subscription;

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

  async signUp(user: UserModel): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password!)
        if(!resp){
          reject()
        }
        const userId = resp.user?.uid;
        user.userId = userId;
        delete user.password;
        await this.userCollection.add(user)
        resolve();
      } catch (err: any) {
        console.log(err);
        this.alertService.showAlert('Error', err, 'error');
        reject()
      }
    });
  }

  logOut() {
    this.user = undefined;
    this.autenticado = false;
    return this.angularFireAuth.signOut();
  }

  unsubscribe(){
    this.authSuscription?.unsubscribe();
  }

  checkAuthentication(rol: Roles): Promise<boolean>{
    console.log('checando la autenticacion')
    return new Promise((resolve, reject) => {
      if(this.autenticado){
        resolve(true);
      }else {
        this.authSuscription = this.angularFireAuth.authState.subscribe(user => {
          if(user && user.uid){
            this.getUser(user.uid).subscribe((resp: UserModel[]) => {
              if(resp.length > 0){
                this.user = undefined;
                this.user = resp[0];
                this.autenticado = true;
                const condicion = this.user.rol === rol.toString();
                if(!condicion){
                  this.router.navigate([`/${this.user.rol.substring(0,1)}`], {replaceUrl: true});
                }
                resolve(condicion);
              }
              reject();
            });
          }
          else {
            this.router.navigate(['/login'], {replaceUrl: true});
            reject();
          }
        },err => {
          reject(err);
        });
      }
    });
  }

  loginGuard(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      if(!this.autenticado){
        console.log('desautenticado')
        resolve(true);
      }
      else {
        this.angularFireAuth.authState.subscribe(user => {
          console.log('autenticado')
          if(!user){
            this.autenticado = false;
            resolve(true);
          }
          else {
            this.autenticado = true;
            this.router.navigate([`/p`], {replaceUrl: true});
            resolve(false);

          }
        },err => {
          reject(err);
        });
      }
    });
  }

  getUser(uid: string){
    this.userCollection = this.afs.collection<UserModel>('users', ref => ref.where('userId', '==', uid));
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
