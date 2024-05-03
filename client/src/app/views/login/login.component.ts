import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserSettingsService } from '../../services/user-settings.service';
import { ApiService } from '../../services/api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public options = {
    position        : ['top', 'right'],
    timeOut         : 2000,
    lastOnBottom    : true,
    maxLength       : 0,
    showProgressBar : true,
    pauseOnHover    : true,
    clickToClose    : false
  };

  constructor(
    public user                   : User,
    private router                : Router,
    private userSettingsService   : UserSettingsService,
    private apiService            : ApiService,
    private notificationsService  : NotificationsService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    if(this.userSettingsService.getUserLogged().login)
      this.router.navigate(['/dashboard']);
  }

  validateLogin() {
    console.log(this.user);
    if (this.user.rut || this.user.password) {
      this.apiService.validateLogin(this.user).subscribe(result => {
        console.log(result);
        if (result['status'] === 'success') {
          var username = result['data'][0]['name'] + " " + result['data'][0]['last_name']
          this.userSettingsService.setUserInfo(result['data'][0]['company']['name'], result['data'][0]['company']['_id'], this.user.rut, username);
          this.userSettingsService.setUserLogged(true);
          this.router.navigate(['/dashboard']);
        } else
        this.notificationsService.error('Error', result['message']);
      });
    } else {
      this.notificationsService.warn('Error', 'Ingrese su usuario y contraseña');
    }
  }
}
