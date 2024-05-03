import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceAddComponent } from './deviceAdd.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceAddComponent,
    data: {
      title: 'Dispositivos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceAddRoutingModule {}
