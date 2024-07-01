import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { StockAlertComponent } from './stock-alert/stock-alert.component';

@NgModule({
  declarations: [
    StockAlertComponent
  ],
  imports: [
    CommonModule,
    AlertsRoutingModule
  ]
})
export class AlertsModule { }
