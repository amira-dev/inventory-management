import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksRoutingModule } from './stocks-routing.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { ReactiveFormsModule } from '@angular/forms';

import { StockService } from './stock.service';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    StockListComponent,
    StockChartComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  providers: [StockService]
})
export class StocksModule { }
