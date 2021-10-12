import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { RegistrarSintomasModel } from '../../../models/registrar-sintomas.model';
import { PacienteService } from '../../../services/paciente.service';
import { AuthService } from '../../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-registrar-sintomas',
  templateUrl: './registrar-sintomas.component.html',
  styleUrls: ['./registrar-sintomas.component.scss']
})
export class RegistrarSintomasComponent implements OnInit {

  loading: boolean = false;

  formulario!: FormGroup;

  validacionMensajes = {
    'descripcion': [
      { type: 'required', message: 'Descripcion requerida.' }
    ],
    'gravidez': [
      { type: 'required', message: 'Gravidez requerida.' },
    ],
    'dias': [
      { type: 'required', message: 'Dias transcurridos es requerids.' },
      { type: 'minlength', message: 'Dias transcurridos debe tener un numero valido.' },
      { type: 'pattern', message: 'Dias transcurridos debe tener un numero valido.' }
    ],
    'personas': [
      { type: 'required', message: 'Personas convividas es requeridas.' },
      { type: 'minlength', message: 'Personas convividas debe tener un numero valido.' },
      { type: 'pattern', message: 'Personas convividas debe tener un numero valido.' }
    ],
    'oxigenacion': [
      { type: 'required', message: 'Oxigenación es requeridas.' },
      { type: 'minlength', message: 'Oxigenación debe tener un numero valido.' },
      { type: 'pattern', message: 'Oxigenación debe tener un numero valido.' }
    ],
    'temperatura': [
      { type: 'required', message: 'Temperatura es requeridas.' },
      { type: 'minlength', message: 'Temperatura debe tener un numero valido.' },
      { type: 'pattern', message: 'Temperatura debe tener un numero valido.' }
    ],
  };


  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private pacienteService: PacienteService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      descripcion: new FormControl('', Validators.required),
      gravidez: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dias: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      personas: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      oxigenacion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      temperatura: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
    });
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  registrarSintomas(){
    this.loading = true;
    const momentDate = moment().format('YYYY-MM-DD');
    const momenthour = moment().format('HH:mm:ss');
    const sintomas: RegistrarSintomasModel = {
      descripcion: this.formulario.get('descripcion')?.value,
      gravidez: this.formulario.get('gravidez')?.value,
      diasTranscurridos: this.formulario.get('dias')?.value,
      personasConvividas: this.formulario.get('personas')?.value,
      oxigenacion: this.formulario.get('oxigenacion')?.value,
      temperatura: this.formulario.get('temperatura')?.value,
      fecha: momentDate,
      hora: momenthour,
      paciente: this.authService.user!,
    }
    console.log(sintomas);
    this.pacienteService.registrarSintomas(sintomas).then(resp => {
      console.log(resp);
      this.alertService.showToast('Sintomas registrados', 'success');
      this.loading = false;
      this.formulario.reset();
    }).catch(err => {
      this.loading = false;
      console.log(err);
    });
  }
}
