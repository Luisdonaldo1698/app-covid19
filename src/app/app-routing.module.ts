import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PacienteGuard } from './guards/paciente.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'p',
    loadChildren: () => import('./pages/pacientes/paciente/paciente.module').then(m => m.PacienteModule),
    canActivate: [PacienteGuard],
  },
  {
    path: 'd',
    loadChildren: () => import('./pages/doctores/doctores.module').then(m => m.DoctoresModule),
    canActivate: [DoctorGuard],
  },
  {
    path: 'a',
    loadChildren: () => import('./pages/admin/admin-home/admin-home.module').then(m => m.AdminHomeModule),
    canActivate: [AdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
