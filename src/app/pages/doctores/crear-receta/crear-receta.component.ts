import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';
import { RecetaModel } from '../../../models/receta.model';
import { MedicamentoModel } from '../../../models/medicamento.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent implements OnInit {

  loading: boolean = false;
  formulario!: FormGroup;
  fecha: Date = new Date;
  display: boolean = false;

  recomendacionesGenerales: string = '';
  medicamentos: MedicamentoModel[] = [];

  validacionMensajes = {
    'nombre': [
      { type: 'required', message: 'Nombre requerido.' }
    ],
    'recomendacion': [
      { type: 'required', message: 'Recomendación requerida.' },
    ],
  };


  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      recomendacion: new FormControl('', Validators.required),
    });
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  generarReceta(){
    if(this.recomendacionesGenerales.trim().length < 1 && this.medicamentos.length < 1){
      this.alertService.showAlert('Receta incompleta', 'Debe agregar recomendaciones generales o medicamentos para proceder', 'warning');
      return;
    }
    this.loading = true;
    const momentDate = moment().format('YYYY-MM-DD');
    const momenthour = moment().format('HH:mm:ss');
    console.log(this.formulario.value);
    const registro = this.doctorService.getRegistro();
    const receta : RecetaModel = {
      fecha: momentDate,
      hora: momenthour,
      recomendacionGeneral: this.recomendacionesGenerales,
      doctor: this.authService.user!,
      paciente: registro.paciente,
      medicamentos: this.medicamentos,
    }
    console.log(receta);
    this.doctorService.generarReceta(receta).then(resp => {
      console.log(resp);
      this.doctorService.clearRegistro();
      this.alertService.showToast('Receta creada exitosamente', 'success');
      this.loading = false;
      this.router.navigate(['/d']);
    }).catch(err => {+
      console.log(err);
      this.alertService.showAlert('Error', err, 'error');
      this.loading = false;
    })
  }

  agregarMedicamento(){
    const medicamento: MedicamentoModel = {
      nombre: this.formulario.get('nombre')?.value,
      recomendacion: this.formulario.get('recomendacion')?.value,
    }
    this.medicamentos.push(medicamento);
    this.formulario.reset();
    this.display = false;
  }

  showDialog() {
    this.display = true;
  }

  clearForm(){
    this.formulario.reset();
  }
}
