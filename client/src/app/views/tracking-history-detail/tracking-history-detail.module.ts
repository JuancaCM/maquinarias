import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common";
import { NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { TrackingHistoryDetailComponent } from './tracking-history-detail.component';
import { TrackingHistoryDetailRoutingModule } from './tracking-history-detail-routing.module';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    FormsModule,
    TrackingHistoryDetailRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCGKfLCGPfpJ08KOmxCzBPI4A3LVpufsss'
    }),
    CommonModule
  ],
  declarations: [ TrackingHistoryDetailComponent ]
})
export class TrackingHistoryDetailModule { }
