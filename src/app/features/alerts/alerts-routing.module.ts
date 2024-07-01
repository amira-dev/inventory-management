import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockAlertComponent } from './stock-alert/stock-alert.component';

const routes: Routes = [{ path: '', component: StockAlertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
