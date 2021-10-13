import { UserModel } from './user.model';
export interface RegistrarSintomasModel{
  descripcion: string;
  gravidez: string;
  diasTranscurridos: number;
  personasConvividas: number;
  oxigenacion: string;
  temperatura: string;
  fecha: string;
  hora: string;
  paciente: UserModel;
  sintomas: SintomasModel;
}

export interface SintomasModel {
  dolorCabeza: boolean;
  diarrea: boolean;
  faltaDeGusto: boolean;
  faltaDeOlfato: boolean;
  vomito: boolean;
  tos: boolean;
  cansancio: boolean;
  dificultadRespiratoria: boolean;
  neumonia: boolean;
}
