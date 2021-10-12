import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {}

  logout(){
    this.authService.logOut().then(resp => {
      console.log(resp);
      this.authService.unsubscribe();
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err)
    });
  }

}
