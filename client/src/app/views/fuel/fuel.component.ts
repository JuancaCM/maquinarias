import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel-service.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { Fuel } from '../../models/fuel.model';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NotificationsService } from 'angular2-notifications';

registerLocaleData(localeEs);

@Component({
  templateUrl: 'fuel.component.html'
})
export class FuelComponent implements OnInit {

  fuelList  : any = [];
  company : String;

  constructor(
    private apiService            : ApiService,
    private router                : Router,
    public fuel                   : Fuel,
    private userSettingsService   : UserSettingsService,
    private excelService          : ExcelService,
    private notificationsService  : NotificationsService
  ) {
    this.fuel = new Fuel();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    this.apiService.getAllCompanyFuel(this.company).subscribe(
      (response) => {
        console.log(response);
        this.fuelList = response;
        this.notificationsService.success('Datos cargados', 'Se han cargado los registros de manera exitosa');
      },
      (error) => {
        // this.notificationsService.error('Error', 'Ha ocurrido el siguiente error: ' + error);
      }
    )
  }

  exportFuel() {
    this.excelService.exportAsExcelFile(this.fuelList, "ingreso_combustible");
  }

}
