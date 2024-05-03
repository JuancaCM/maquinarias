import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'tracking-history',
        loadChildren: './views/tracking-history/tracking-history.module#TrackingHistoryModule'
      },
      {
        path: 'tracking-history-detail',
        loadChildren: './views/tracking-history-detail/tracking-history-detail.module#TrackingHistoryDetailModule'
      },
      {
        path: 'vehicle',
        loadChildren: './views/vehicle/vehicle.module#VehicleModule'
      },
      {
        path: 'vehicleAdd',
        loadChildren: './views/vehicleAdd/vehicleAdd.module#VehicleAddModule'
      },
      {
        path: 'fuel',
        loadChildren: './views/fuel/fuel.module#FuelModule'
      },
      {
        path: 'device',
        loadChildren: './views/device/device.module#DeviceModule'
      },
      {
        path: 'deviceAdd',
        loadChildren: './views/deviceAdd/deviceAdd.module#DeviceAddModule'
      },
      {
        path: 'user',
        loadChildren: './views/user/user.module#UserModule'
      },
      {
        path: 'userAdd',
        loadChildren: './views/userAdd/userAdd.module#UserAddModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
