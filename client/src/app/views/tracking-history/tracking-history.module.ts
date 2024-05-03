import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common";
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { TrackingHistoryComponent } from './tracking-history.component';
import { TrackingHistoryRoutingModule } from './tracking-history-routing.module';

@NgModule({
  imports: [
    FormsModule,
    TrackingHistoryRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: [ TrackingHistoryComponent ]
})
export class TrackingHistoryModule { }
