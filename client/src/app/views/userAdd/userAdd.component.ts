import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { User } from '../../models/user.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: 'userAdd.component.html',
  providers:  [ApiService]
})
export class UserAddComponent implements OnInit {

  userTypes : any = [{ id:"Administrador", type:"Administrador" },{ id:"Operario", type:"Operario" }];
  flag      : boolean = false;
  company   : String;

  constructor(
    private apiService          : ApiService,
    private router              : Router,
    public user                 : User,
    private userSettingsService : UserSettingsService,
    private notificationService : NotificationsService
  ) {
    this.user = new User();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    var data = this.router.getNavigatedData();
    if (data[1]) {
      this.user = data[0];
      this.flag = true;
      this.notificationService.success("Datos cargados", "Se han cargado los datos del usuario de manera exitosa");
    }
  }

  addUser() {
    this.user.company = this.company;
    if (this.user.rut != "" || this.user.name != "" || this.user.last_name != "" || this.user.email != "" || this.user.password != ""
       || this.user.type != "")
      this.apiService.addUser(this.user, this.user.company).subscribe(
        (response) => {
          console.log('response is ', response);
          switch(response.code) {
            case 777:
              this.notificationService.success("Usuario registrado", "El usuario a sido registrado con éxito");
              this.backUserList();
              break;
            case 11000:
              this.notificationService.error("Error", "El usuario ya se enceuntra registrado en el sistema");
              break;
            default:
              this.notificationService.error("Error", "Favor contactarse con el administrador");
              break;
          }
        },
        (error) => {

        }
      )
    else
      this.notificationService.warn("Advertencia", "Favor complete todos los campos del formulario");
  }

  editUser() {
    this.user.company = this.company;
    this.apiService.editUser(this.user, this.user.company).subscribe(
      (response) => {
        console.log('response is ', response);
        switch(response.code) {
          case 777:
            this.notificationService.success("Modificación realizada", "El usuario a sido modificado con exito!");
            break;
          default:
            this.notificationService.error("Error", "Ha ocurrido un error, favor contactarse con el administrador");
            break;
        }
      },
      (error) => {

      }
    )
  }

  backUserList() {
    this.router.navigate(['/user']);
  }
}
