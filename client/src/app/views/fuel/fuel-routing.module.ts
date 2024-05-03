import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelComponent } from './fuel.component';

const routes: Routes = [
  {
    path: '',
    component: FuelComponent,
    data: {
      title: 'Combustible'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule {}
