import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { User } from '../../models/user.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: 'user.component.html',
  providers:  [ApiService]
})
export class UserComponent implements OnInit {

  userList  : any = [];
  company : String;

  constructor(
    private apiService    : ApiService,
    private router        : Router,
    public user           : User,
    private userSettingsService : UserSettingsService,
    private notificationsService  : NotificationsService
  ) {
    this.user = new User();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    this.apiService.getAllCompanyUsers(this.company).subscribe(
      (response) => {
        console.log(response);
        this.userList = response;
        this.notificationsService.success('Datos cargados', 'Se han cargado los usuarios de manera exitosa');
      },
      (error) => {

      }
    )
  }

  addUser() {
    this.router.navigate(['/userAdd']);
  }

  editUser(user: User) {
    this.router.navigateByData({
      url: ["/userAdd"],
      data: [user, true]
    });
  }
}
