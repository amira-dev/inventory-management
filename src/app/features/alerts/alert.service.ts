import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stock } from '../stocks/stock.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private lowStockThreshold = 10; // Seuil de stock faible

  constructor(private http: HttpClient) { }

  getLowStockAlerts(): Observable<Stock[]> {
    return this.http.get<Stock[]>('/api/stocks').pipe(
      map(stocks => stocks.filter(stock => stock.quantity <= this.lowStockThreshold))
    );
  }

}
