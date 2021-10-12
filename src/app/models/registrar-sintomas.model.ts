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
}
