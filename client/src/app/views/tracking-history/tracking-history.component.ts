import {Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {ApiService} from '../../services/api.service';
import {UserSettingsService} from '../../services/user-settings.service';
import {Vehicle} from '../../models/vehicle.model';
import {NgbDateStruct, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';
import {NotificationsService} from 'angular2-notifications';


const I18N_VALUES = {
  'es': {
    weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
    months_full: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  }
};

@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return I18N_VALUES[this._i18n.language].months_full[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  templateUrl: 'tracking-history.component.html',
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class TrackingHistoryComponent implements OnInit {

  vehicleList: any = [];
  journalList: any = [];
  modelIni: any;
  modelFin: any;
  company: String;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private vehicle: Vehicle,
    private calendar: NgbDatepickerI18n,
    private userSettingsService: UserSettingsService,
    private notificationsService: NotificationsService
  ) {
    this.vehicle = new Vehicle();
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  ngOnInit() {
    this.apiService.getAllCompanyVehicles(this.company).subscribe(
      (response) => {
        console.log(response);
        this.vehicleList = response;
      },
      (error) => {

      }
    )
    this.apiService.getLastNJournals(this.company, 10).subscribe(
      (response) => {
        console.log(response);
        this.journalList = response;
        this.notificationsService.success('Datos cargados', 'Se han cargado los últimos registros de manera exitosa');
      },
      (error) => {

      }
    )
  }

  loadDetail(identifier: String) {
    this.router.navigate(['/tracking-history-detail'], {queryParams: {identifier: identifier}});
  }

  getJournals(form) {
    const formValues = form.value;
    console.log(formValues);

    if (formValues.fInicial === undefined || formValues.fFinal === undefined)
      this.notificationsService.warn('Advertencia', 'Favor complete todos los campos del formulario');
    else {
      var fInicial = ((formValues.fInicial.day < 10) ? '0' + formValues.fInicial.day : formValues.fInicial.day)
        + '/' + ((formValues.fInicial.month < 10) ? '0' + formValues.fInicial.month : formValues.fInicial.month)
        + '/' + formValues.fInicial.year;
      var fFinal = ((formValues.fFinal.day < 10) ? '0' + formValues.fFinal.day : formValues.fFinal.day)
        + '/' + ((formValues.fFinal.month < 10) ? '0' + formValues.fFinal.month : formValues.fFinal.month)
        + '/' + formValues.fFinal.year;
      this.apiService.getAllJournalByDate(this.company, fInicial, fFinal).subscribe(
        (response) => {
          console.log(response);
          this.journalList = response;
        },
        (error) => {

        }
      )
    }
  }
}

export class NgbdDatepickerPopup {
  modelIni;
  modelFin;
}
