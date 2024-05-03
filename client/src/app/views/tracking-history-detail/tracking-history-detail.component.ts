import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {ApiService} from '../../services/api.service';
import {UserSettingsService} from '../../services/user-settings.service';
import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';
import {NotificationsService} from 'angular2-notifications';

declare var require: any;

@Component({
  templateUrl: 'tracking-history-detail.component.html'
})
export class TrackingHistoryDetailComponent implements OnInit {

  journal: any = [];
  pauses: any = [];
  sub: any;
  identifier: String;
  coordinates: Coordinate[] = [];
  firstLocation: any = [];
  company: String;
  totalLiters = 0;
  pausedTimeTotal: any = '';
  totalHectares = 0;

  public distance = require('distance.js');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userSettingsService: UserSettingsService,
    private notificationService: NotificationsService
  ) {
    this.company = this.userSettingsService.getUserInfo().companyID;
  }

  returnHistory() {
    this.router.navigate(['/tracking-history']);
  }

  ngOnInit() {
    this.loadTrackingDetail();
    this.notificationService.success('Datos cargados', 'Se han cargado los datos del registro de manera exitosa');
    setTimeout(() => {
        /*this.loadTrackingDetail();*/
      }, 10000);
  }

  loadTrackingDetail() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.identifier = params['identifier'];
      });
    this.apiService.getJournalByID(this.identifier).subscribe(
      (response) => {
        this.journal = response;
        const date = moment(this.journal.date).format('YYYY-MM-DD');
        let end_time: any;
        const start_time = moment(date + ' ' + this.journal.start_time, 'YYYY-MM-DD HH:mm:ss');
        end_time = moment(date + ' ' + end_time, 'YYYY-MM-DD HH:mm');
        console.log('Horas trabajadas:  ' + this.journal.duration);
      },
      (error) => {

      }
    )
    this.apiService.getFuelByJournal(this.identifier).subscribe(
      (response) => {
        this.totalLiters = (response[0] === undefined) ? 0 : response[0].liters.$numberDecimal;
      },
      (error) => {

      }
    )
    this.apiService.getVehicleLocationsByJournal(this.identifier).subscribe(
      (response) => {
        const start = {
          latitude: 0,
          longitude: 0
        };
        const end = {
          latitude: 0,
          longitude: 0
        };
        this.firstLocation = new Coordinate(Number(response['data'][0].lat), Number(response['data'][0].long), response['data'][0].time);
        start.latitude = this.firstLocation.latitude;
        start.longitude = this.firstLocation.longitude;
        for (const coordinate of response['data']) {
          end.latitude = coordinate.lat;
          end.longitude = coordinate.long;
          // console.log('START: ' + start + ' - END: ' + end + ' - DISTANCE: ' + this.distance.getDistance(start, end, 3) + ' - TOTAL: ' + (this.totalHectares + this.distance.getDistance(start, end, 3)));
          this.totalHectares += this.distance.getDistance(start, end, 3);
          this.coordinates.push(new Coordinate(Number(coordinate.lat), Number(coordinate.long), coordinate.time));
          start.latitude = coordinate.lat;
          start.longitude = coordinate.long;
        }
        // console.log('KM: ' + this.totalHectares);
        // console.log('KM TO KM2: ' + this.totalHectares * 0.0010);
        // console.log('KM2 TO HA: ' + (this.totalHectares * 0.0010)*100.0000);
        this.totalHectares = (this.totalHectares * 0.0010) * 100.0000;
      },
      (error) => {

      }
    )
    this.apiService.getVehiclesPausesByJournal(this.identifier).subscribe(
      (response) => {
        this.pauses = response;
        const pausesBak = [];
        let pausedTime: any;
        for (const pause of this.pauses) {
          let end_time: any;
          if (pause.end_time === '') {
            const now = moment().locale('es');
            end_time = now.hour() + ':' + ((now.minutes() < 10) ? '0' + now.minutes() : now.minutes());
          } else
            end_time = pause.end_time;
          const date = moment(pause.date).format('YYYY-MM-DD');
          const start_time = moment(date + ' ' + pause.start_time, 'YYYY-MM-DD HH:mm');
          end_time = moment(date + ' ' + end_time, 'YYYY-MM-DD HH:mm');
          pausedTime = moment(end_time.diff(start_time)).utcOffset(0).format('HH:mm');
          // pausedTime = moment.utc(moment(pause.date + ' ' + end_time,'DD/MM/YYYY HH:mm').diff(moment(pause.date + ' ' + pause.start_time,'DD/MM/YYYY HH:mm'))).format('HH:mm');
          pause.pausedTime = pausedTime.toString();
          this.pausedTimeTotal += pausedTime;
          pausesBak.push(pause);
        }
        this.pauses = pausesBak;
      },
      (error) => {

      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

class Coordinate {
  latitude: number;
  longitude: number;
  time: String;

  constructor(lat, long, time) {
    this.latitude = lat;
    this.longitude = long;
    this.time = time;
  }

}
