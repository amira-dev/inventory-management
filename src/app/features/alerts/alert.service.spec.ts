import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertService } from './alert.service';
import { Stock } from '../stocks/stock.model';

describe('AlertService', () => {
  let service: AlertService;
  let httpTestingController: HttpTestingController;

  const mockStocks: Stock[] = [
    { id: 1, productId: 1, quantity: 5 },
    { id: 2, productId: 2, quantity: 15 },
    { id: 3, productId: 3, quantity: 8 },
    { id: 4, productId: 4, quantity: 20 },
    { id: 5, productId: 5, quantity: 9 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlertService]
    });
    service = TestBed.inject(AlertService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return low stock alerts', () => {
    service.getLowStockAlerts().subscribe(alerts => {
      expect(alerts.length).toBe(3);
      expect(alerts).toEqual([
        { id: 1, productId: 1, quantity: 5 },
        { id: 3, productId: 3, quantity: 8 },
        { id: 5, productId: 5, quantity: 9 },
      ]);
    });

    const req = httpTestingController.expectOne('/api/stocks');
    expect(req.request.method).toBe('GET');
    req.flush(mockStocks);
  });
});
