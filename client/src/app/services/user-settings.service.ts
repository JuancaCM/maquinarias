import { Injectable } from '@angular/core';

@Injectable()
export class UserSettingsService {
  constructor() {}

  setUserLogged(flag) {
    let preferences = {
      login   : flag
    }
    localStorage.setItem('logged', JSON.stringify(preferences));
    if (!flag)
      localStorage.removeItem('userInfo');
  }

  getUserLogged() {
    let local = localStorage.getItem('logged');
    if (local)
      return JSON.parse(local);
    else {
      let preferences = {
        login : false
      }
      return preferences;
    }
  }

  setUserInfo(company, companyID, user, username) {
    let preferences = {
        company   : company,
        companyID : companyID,
        user      : user,
        username  : username
    }
    localStorage.setItem('userInfo', JSON.stringify(preferences));
  }

  getUserInfo() {
    let local = localStorage.getItem('userInfo');
    if (local)
      return JSON.parse(local);
    else {
      let preferences = {
        company   : "",
        companyID : "",
        user      : "",
        username  : ""
      }
      return preferences;
    }
  }
}