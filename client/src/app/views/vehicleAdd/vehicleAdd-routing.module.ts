import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleAddComponent } from './vehicleAdd.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleAddComponent,
    data: {
      title: 'Vehiculos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleAddRoutingModule {}
