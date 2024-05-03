import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import "angular2-navigate-with-data";

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

// Import API service
import { ApiService } from './services/api.service';
import { ExcelService } from './services/excel-service.service';

// Import User Settings service
import { UserSettingsService } from './services/user-settings.service';

// Import custom models
import { User } from './models/user.model';
import { Device } from './models/device.model';
import { Vehicle } from './models/vehicle.model';
import { Fuel } from './models/fuel.model';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    ApiService,
    UserSettingsService,
    User,
    Device,
    Vehicle,
    Fuel,
    ExcelService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
