import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stock } from '../../stocks/stock.model';

@Component({
  selector: 'app-stock-alert',
  templateUrl: './stock-alert.component.html',
  styleUrls: ['./stock-alert.component.scss']
})
export class StockAlertComponent implements OnInit, OnDestroy {

  lowStockProducts: Stock[] = [];
  private destroy$ = new Subject<void>();

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // Fetch low stock alerts on component initialization
    this.alertService.getLowStockAlerts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((stocks: Stock[]) => {
        this.lowStockProducts = stocks;
      });
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
