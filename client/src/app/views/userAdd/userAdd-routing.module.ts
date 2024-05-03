import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAddComponent } from './userAdd.component';

const routes: Routes = [
  {
    path: '',
    component: UserAddComponent,
    data: {
      title: 'Usuarios'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAddRoutingModule {}
