import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../stock.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stock } from '../stock.model';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit, OnDestroy {
  
  stockData: { name: string, value: number }[] = [];
  view: [number, number] = [700, 400];
  private destroy$ = new Subject<void>();

  constructor(private stockService: StockService) { }

  ngOnInit() {
    // Fetch top 5 low stock products and format data for chart
    this.stockService.getTopLowStockProducts(5)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Stock[]) => {
        this.stockData = data.map(item => ({
          name: `Product ${item.productId}`,
          value: item.quantity
        }));
      });
  }

  ngOnDestroy() {
    // Unsubscribe all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
