import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { Device } from '../../models/device.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: 'deviceAdd.component.html',
  providers:  [ApiService]
})
export class DeviceAddComponent implements OnInit {

  flag  : boolean = false
  company : String;

  constructor(
    private apiService          : ApiService,
    private router              : Router,
    public device               : Device,
    public userSettingsService  : UserSettingsService,
    private notificationService : NotificationsService
  ) {
    this.device = new Device();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    var data = this.router.getNavigatedData();
    if (data[1]) {
      this.device = data[0];
      this.flag = true;
      this.notificationService.success("Datos cargados", "Se han cargado los datos del dispositivo de manera exitosa");
    }
  }

  addDevice() {
    this.device.company = this.company;
    if (this.device.device != "" || this.device.model != "" || this.device.id != "" || this.device.number != "")
      this.apiService.addDevice(this.device, this.company).subscribe(
        (response) => {
          console.log('response is ', response);
          switch(response.code) {
            case 777:
              this.notificationService.success("Dispositivo registrado", "Se han registrado el dispositivo de manera exitosa");
              this.backDeviceList();
              break;
            case 11000:
              this.notificationService.warn("Advertencia", "El dispositivo ya se encuentra registrado en el sistema");
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

  editDevice() {
    this.apiService.editDevice(this.device, this.company).subscribe(
      (response) => {
        console.log('response is ', response);
        switch(response.code) {
          case 777:
            this.notificationService.success("Dispositivo modificado", "El dispositivo a sido modificado con exito!");
            break;
          default:
            this.notificationService.error("Error", "Favor contactarse con el administrador");
            break;
        }
      },
      (error) => {

      }
    )
  }

  backDeviceList() {
    this.router.navigate(['/device']);
  }
}
