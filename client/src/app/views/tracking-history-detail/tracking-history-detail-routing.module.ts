import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingHistoryDetailComponent } from './tracking-history-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TrackingHistoryDetailComponent,
    data: {
      title: 'Detalle de registro'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingHistoryDetailRoutingModule {}
