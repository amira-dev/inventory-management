import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = '/api/stocks';

  constructor(private http: HttpClient) { }

  getStockLevels(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  getTopLowStockProducts(topN: number): Observable<Stock[]> {
    return this.getStockLevels().pipe(
      map((stocks: Stock[]) => stocks.sort((a, b) => a.quantity - b.quantity).slice(0, topN))
    );
  }
}
