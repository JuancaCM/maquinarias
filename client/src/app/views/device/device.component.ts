import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { Device } from '../../models/device.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: 'device.component.html',
  providers:  [ApiService]
})
export class DeviceComponent implements OnInit {

  deviceList  : any = [];
  company : String;

  constructor(
    private apiService  : ApiService,
    private router      : Router,
    public device       : Device,
    private userSettingsService : UserSettingsService,
    private notificationsService  : NotificationsService
  ) {
    this.device = new Device();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    this.apiService.getAllCompanyDevices(this.company).subscribe(
      (response) => {
        console.log(response);
        this.deviceList = response;
        this.notificationsService.success('Datos cargados', 'Se han cargado los dispositivos de manera exitosa');
      },
      (error) => {

      }
    )
  }

  addDevice() {
    this.router.navigate(['/deviceAdd']);
  }

  editDevice(device: Device) {
    this.router.navigateByData({
      url: ["/deviceAdd"],
      data: [device, true]
    });
  }
}
