import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";

import { UserAddComponent } from './userAdd.component';
import { UserAddRoutingModule } from './userAdd-routing.module';

@NgModule({
  imports: [
    FormsModule,
    UserAddRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: [ UserAddComponent ]
})
export class UserAddModule { }
