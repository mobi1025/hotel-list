import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelListComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HotelListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
