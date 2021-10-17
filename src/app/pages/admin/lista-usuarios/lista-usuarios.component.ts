import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { UserModel } from '../../../models/user.model';
import { Roles } from 'src/app/models/userRol.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  @Input()rol: string = Roles.paciente;

  pacientes: UserModel[] = [];
  doctores: UserModel[] = [];
  loading: boolean = false;

  pacientesSubscription?: Subscription;
  doctoresSubscription?: Subscription;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.doctoresSubscription?.unsubscribe();
    this.pacientesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    if(this.rol === Roles.paciente){
      this.pacientesSubscription = this.adminService.listarPacientes().subscribe(resp => {
        this.pacientes = resp;
        this.loading = false;
      },err => {
        console.log(err);
        this.loading = false;
      });
    }
    else {
      this.doctoresSubscription = this.adminService.listarDoctores().subscribe(resp => {
        this.doctores = resp;
        this.loading = false;
      },err => {
        console.log(err);
        this.loading = false;
      })
    }
  }

  eliminarUsuario(usuario: UserModel){
    console.log('eliminar');
    console.log(usuario);
  }

}
