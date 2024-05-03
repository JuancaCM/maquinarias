import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { Vehicle } from '../../models/vehicle.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  templateUrl: 'vehicleAdd.component.html'
})
export class VehicleAddComponent implements OnInit {

  vehicleTypes  : any = [{ id:"Tractor", type:"Tractor" },{ id:"Cosechadora", type:"Cosechadora" }];
  driverList    : any = [];
  deviceList    : any = [];
  flag          : boolean = false;
  company : String;

  constructor(
    private apiService    : ApiService,
    private router        : Router,
    public vehicle        : Vehicle,
    private userSettingsService : UserSettingsService,
    private notificationService : NotificationsService
  ) {
    this.vehicle = new Vehicle();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    this.apiService.getAllCompanyDevices(this.company).subscribe(
      (response) => {
        console.log('response is ', response);
        this.deviceList = response;
      },
      (error) => {

      }
    )
    this.apiService.getAllCompanyDrivers(this.company).subscribe(
      (response) => {
        console.log('response is ', response);
        this.driverList = response;
      },
      (error) => {

      }
    )
    var data = this.router.getNavigatedData();
    if (data[1]) {
      this.vehicle = data[0];
      this.flag = true;
      this.notificationService.success("Datos cargados", "Se han cargado los datos del vehiculo de manera exitosa");
    }
  }

  addVehicle() {
    this.vehicle.company = this.company;
    console.log(this.vehicle);
    if (this.vehicle.patent != "" || this.vehicle.vehicle != "" || this.vehicle.type != "")
      this.apiService.addVehicle(this.vehicle, this.vehicle.company).subscribe(
        (response) => {
          console.log('response is ', response);
          switch(response.code) {
            case 777:
              this.notificationService.success("Vehiculo registrado", "El vehiculo ha sido registrado con exito!");
              this.backVehicleList();
              break;
            case 11000:
              this.notificationService.warn("Advertencia", "El vehiculo ya se encuentra registrado en el sistema");
              break;
            default:
              this.notificationService.success("Error", "Favor contactarse con el administrador");
              break;
          }
        },
        (error) => {

        }
      )
    else
      this.notificationService.warn("Advertencia", "Favor complete todos los campos del formulario");
  }

  editVehicle() {
    this.vehicle.company = this.company;
    this.apiService.editVehicle(this.vehicle, this.vehicle.company).subscribe(
      (response) => {
        console.log('response is ', response);
        switch(response.code) {
          case 777:
            this.notificationService.success("Modificación realizada", "El usuario ha sido modificado con exito!");
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

  backVehicleList() {
    this.router.navigate(['/vehicle']);
  }
}
