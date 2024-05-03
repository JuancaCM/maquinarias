import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { Vehicle } from '../../models/vehicle.model';
import { NotificationsService } from 'angular2-notifications';
import { QRService } from './qr-service';

@Component({
  templateUrl: 'vehicle.component.html'
})
export class VehicleComponent implements OnInit {

  vehicleList: any = [];
  company: String;
  urlCodigoQR: string; // Variable para almacenar la URL del código QR generado

  constructor(
    private apiService: ApiService,
    private router: Router,
    public vehicle: Vehicle,
    private userSettingsService: UserSettingsService,
    private notificationsService: NotificationsService,
    private qrService: QRService
  ) {
    this.vehicle = new Vehicle();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    this.apiService.getAllCompanyVehicles(this.company).subscribe(
      (response) => {
        console.log(response);
        this.vehicleList = response;
        this.notificationsService.success('Datos cargados', 'Se han cargado los vehiculos de manera exitosa');
      },
      (error) => {

      }
    )
  }

  verCodigoQR(vehicle: any): void {
    const data = vehicle.patent; // Obtener la patente del vehículo para generar el código QR
    this.qrService.generarQR(data)
      .then(url => {
        this.urlCodigoQR = url; // Asignar la URL del código QR a la variable urlCodigoQR
      })
      .catch(error => console.error('Error al generar el código QR:', error));
  }

  addVehicle() {
    this.router.navigate(['/vehicleAdd']);
  }

  editVehicle(vehicle: Vehicle) {
    this.router.navigateByData({
      url: ["/vehicleAdd"],
      data: [vehicle, true]
    });
  }

}
