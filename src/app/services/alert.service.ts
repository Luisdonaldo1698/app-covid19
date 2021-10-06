import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(title: string, description: string, type: SweetAlertIcon){
    Swal.fire({
      title,
      text: description,
      icon: type,
    });
  }
}
