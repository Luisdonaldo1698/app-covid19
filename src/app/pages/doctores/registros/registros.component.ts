import { Component, OnInit } from '@angular/core';
import { RegistrarSintomasModel } from '../../../models/registrar-sintomas.model';
import { DoctorService } from '../../../services/doctor.service';
import * as moment from 'moment';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {

  registros: RegistrarSintomasModel[] = [];
  loading: boolean = false;
  fecha: Date = new Date;

  constructor(
    private doctorService: DoctorService,
  ) { }

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(fecha?: string){
    if(!fecha){
      fecha = moment().format('YYYY-MM-DD');
    }
    this.loading = true;
    this.doctorService.listarRegistros(fecha).subscribe(resp => {
      console.log(resp);
      this.registros = resp;
      this.loading = false;
    },err => {
      console.log(err);
      this.loading = false;
    });
  }

  filtroFecha(){
    const formatoFecha = moment(this.fecha).format('YYYY-MM-DD');
    this.cargarRegistros(formatoFecha);
  }

}
