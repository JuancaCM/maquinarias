import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingHistoryComponent } from './tracking-history.component';

const routes: Routes = [
  {
    path: '',
    component: TrackingHistoryComponent,
    data: {
      title: 'Registros'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingHistoryRoutingModule {}
