import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Device } from '../models/device.model';
import { Location } from '../models/location.model';
import { User } from '../models/user.model';
import { Vehicle } from '../models/vehicle.model';
import { WorkPause } from '../models/workPause.model';
import { Fuel } from '../models/fuel.model';

const API_URL = environment.apiURL;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  // API USERS
  public getAllCompanyUsers(company: String) {
    return this.http
      .get(API_URL + '/user/' + company)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllCompanyDrivers(company: String) {
    return this.http
      .get(API_URL + '/user/' + company + '/drivers')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public addUser(user: User, company: String) {
    return this.http
      .post(API_URL + '/user/' + company + '/add', user)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public editUser(user: User, company: String) {
    return this.http
      .post(API_URL + '/user/' + company + '/update', user)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public validateLogin(user: User) {
    var params = {
      "user": user.rut,
      "password": user.password
    }
    return this.http
      .post(API_URL + '/user', params)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // API DEVICES
  public getAllCompanyDevices(company: String) {
    return this.http
      .get(API_URL + '/device/' + company)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public addDevice(device: Device, company: String) {
    return this.http
      .post(API_URL + '/device/' + company + '/add', device)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public editDevice(device: Device, company: String) {
    return this.http
      .post(API_URL + '/device/' + company + '/update', device)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // API VEHICLES
  public getAllCompanyVehicles(company: String) {
    return this.http
      .get(API_URL + '/vehicle/' + company)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public addVehicle(vehicle: Vehicle, company: String) {
    return this.http
      .post(API_URL + '/vehicle/' + company + '/add', vehicle)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public editVehicle(vehicle: Vehicle, company: String) {
    return this.http
      .post(API_URL + '/vehicle/' + company + '/update', vehicle)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllVehicleTypes() {
    return this.http
      .get(API_URL + '/vehicleType')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // API FUEL
  public getAllCompanyFuel(company: String) {
    console.log(API_URL + '/fuel/company/' + company);
    return this.http
      .get(API_URL + '/fuel/company/' + company)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getFuelByDate(company: String, startDate: String, endDate: String) {
    return this.http
      .post(API_URL + '/fuel/company/' + company + '/total', {startDate, endDate})
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getFuelByJournal(journal: String) {
    return this.http
      // .get(API_URL + '/fuel/journal/' + journal)
      .post(API_URL + '/fuel/journal', { journal })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // API LOCATION
  public getAllVehiclesLocationsByDate(company: String, startDate: String, endDate: String) {
    return this.http
      .post(API_URL + '/location/' + company + '/date', { startDate, endDate })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getVehicleLocationsByJournal(journal: String) {
    return this.http
      .post(API_URL + '/location/', { journal })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // public getVehicleLocationsByDate(company: String, vehicle: String, date: String) {
  //   return this.http
  //     .post(API_URL + '/location/' + company, { vehicle, date })
  //     .map(response => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }

  // API JOURNAL
  public getJournalByID(identifier: String) {
    return this.http
      .post(API_URL + '/journal/detail', {identifier})
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // public getJournalByDate(company: String, vehicle: String, date: String) {
  //   return this.http
  //     .post(API_URL + '/journal/' + company, {company, vehicle, date})
  //     .map(response => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }

  public getAllJournalByDate(company: String, startDate: String, endDate: String) {
    return this.http
      .post(API_URL + '/journal/' + company + '/journals', { startDate, endDate })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getLastNJournals(company: String, nJournals: Number) {
    return this.http
      .post(API_URL + '/journal/' + company + '/lastN', { "nJournals": nJournals })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // API PAUSE
  // public getVehiclesPausesByDate(company: String, vehicle: String, date: String) {
  //   return this.http
  //     .post(API_URL + '/pause/' + company, {vehicle, date})
  //     .map(response => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }

  public getVehiclesPausesByJournal(journal: String) {
    return this.http
      .post(API_URL + '/pause/', {journal})
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
