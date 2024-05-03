import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../services/api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';

declare var require: any;
registerLocaleData(localeEs);

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  company : String;
  user    : String;

  constructor(
    private apiService          : ApiService,
    private userSettingsService : UserSettingsService,
    private router              : Router
  ) {
    this.user = this.userSettingsService.getUserInfo();
    this.company = this.user["companyID"];
  }

  public fInicio = "";
  public fFinal = "";
  public startTime: any;
  public endTime: any;
  public totalTime = "00:00";
  public totalHectares = 0;
  public totalLiters = 0;
  public vehicleInfo: any = [];
  public vehicles = [];
  public vehiclesWorkTime = "";
  public vehiclesHectare = 0;
  public distance = require('distance.js');
  public journalVehicleDetail: any = [];


  redirectToRoute(route: string): void {
    this.router.navigate([route]);
  }

  hover: boolean = false; // for the hover effect
  
  ngOnInit(): void {
    var now = moment().locale("es");
    var monday = now.weekday(0);
    var day = (monday.date() < 10) ? "0" + (monday.date()):(monday.date());
    var month = (monday.month() < 9) ? "0" + (monday.month() + 1):(monday.month() + 1);
    this.fInicio = monday.year()+"-"+month+"-"+day

    var sunday = monday.add(6,'d');
    day = (sunday.date() < 10) ? "0" + (sunday.date()):(sunday.date());
    month = (sunday.month() < 9) ? "0" + (sunday.month() + 1):(sunday.month() + 1);
    this.fFinal = sunday.year()+"-"+month+"-"+day

    
    this.apiService.getAllJournalByDate(this.company, this.fInicio, this.fFinal).subscribe(
      (response) => {
        console.log(response);
        var end_time: any;
        var workedHours = 0;
        // var workedHours: any = [];
        for(let journal of response) {
          console.log(journal)
          end_time = journal.end_time
          if (journal.end_time == "") {
            var now = moment().locale("es");
            end_time = now.hour() + ":" + ((now.minutes() < 10) ? "0" + now.minutes():now.minutes());
          }
          var date = moment(journal.date).format("YYYY-MM-DD");
          var start_time = moment(date + " " + journal.start_time, "YYYY-MM-DD HH:mm");
          end_time = moment(date + " " + end_time, "YYYY-MM-DD HH:mm");
          console.log(moment(end_time.diff(start_time)).utcOffset(0));
          workedHours += +moment(end_time.diff(start_time)).utcOffset(0);
          // workedHours.push(moment.utc(moment(journal.date + " " + endTime,"HH:mm").diff(moment(journal.date + " " + journal.start_time,"HH:mm"))).format("HH:mm").toString());
        }
        console.log("WORKED HOURS " + moment(workedHours))
        console.log("WORKED HOURS " + moment.duration(workedHours))
        // console.log("WORKED HOURS " + moment.duration(workedHours).format("HH:mm"))
        // if (workedHours.length > 1) {
        //   var totalTimeBak: any;
        //   var now = moment().locale("es");
        //   var day = (now.date() < 10) ? "0" + (now.date()):(now.date());
        //   var month = (now.month() < 10) ? "0" + (now.month() + 1):(now.month() + 1);
        //   var dateBak = day+"/"+month+"/"+now.year();
        //   // for(var i = 0; i < workedHours.length; i++) {
        //   //   if (i == 0) {
        //   //     totalTimeBak = moment(dateBak + " " + workedHours[i]);
        //   //   }
        //   //   else {
        //   //     totalTimeBak = moment(dateBak + " " + totalTimeBak).add(moment(dateBak + " " + workedHours[i]));
        //   //   }
        //   // }
        //   this.totalTime = totalTimeBak;
        // } else {
        //     if (workedHours[0] == undefined)
        //       this.totalTime = "00:00"
        //     else
        //       this.totalTime = workedHours[0];
        // }
      },
      (error) => {

      }
    )
    this.apiService.getFuelByDate(this.company, this.fInicio, this.fFinal).subscribe(
      (response) => {
        console.log(response);
        this.totalLiters = response[0].liters.$numberDecimal;
      },
      (error) => {

      }
    )
    this.apiService.getAllVehiclesLocationsByDate(this.company, this.fInicio, this.fFinal).subscribe(
      (response) => {
        this.vehicleInfo = response;
        var vehiclesTemp = []
        var start = {
          latitude: 0,
          longitude: 0
        }
        var end = {
          latitude: 0,
          longitude: 0
        }
        for(var i = 0; i < this.vehicleInfo.length; i++) {
          var vehicle = this.vehicleInfo[i]
          if (vehiclesTemp.indexOf(vehicle.vehicle._id) === -1) {
            vehiclesTemp.push(vehicle.vehicle._id)
            this.vehicles.push(vehicle.vehicle)
          }
        }
        for(var i = 0; i < this.vehicleInfo.length; i++) {
          if (i == 0) {
            start.latitude = this.vehicleInfo[i].lat;
            start.longitude = this.vehicleInfo[i].long;
            end.latitude = this.vehicleInfo[i].lat;
            end.longitude = this.vehicleInfo[i].long;
            this.totalHectares += this.distance.getDistance(start, end, 3)
            //this.startTime = moment(vehicle.time, "HH:mm");
          } else {
            end.latitude = this.vehicleInfo[i].lat;
            end.longitude = this.vehicleInfo[i].long;
            this.totalHectares += this.distance.getDistance(start, end, 3)
            start.latitude = this.vehicleInfo[i].lat;
            start.longitude = this.vehicleInfo[i].long;
          }
        }
        this.totalHectares = (this.totalHectares * 0.0001) * 100.00;
      },
      (error) => {

      }
    )
  }
}
