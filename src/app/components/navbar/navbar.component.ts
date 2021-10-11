import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(
    private authService: AuthService,
  ) { }


  ngOnInit() {}

  logout(){
    this.authService.logOut().then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err)
    });
  }

}
