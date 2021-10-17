import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../models/userRol.enum';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  rol: Roles = Roles.doctor;

  constructor() { }

  ngOnInit(): void {
  }

}
