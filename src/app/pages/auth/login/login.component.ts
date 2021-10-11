import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  validacionMensajes = {
    'email': [
      { type: 'required', message: 'Correo electrónico requerido.' },
      { type: 'pattern', message: 'Ingresar un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caractéres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  login(){
    this.authService.login(this.formulario.get('email')?.value, this.formulario.get('password')?.value).then(resp => {
      this.authService.getUser(resp.user?.uid!).subscribe((user: UserModel[]) => {
        console.log(user);
        if(user.length){
          const usera = user[0];
          this.router.navigate([`/${usera.rol.substring(0,1)}`], {replaceUrl: true});
        }
      });
    }).catch(err =>
      console.log(err));
  }


}
