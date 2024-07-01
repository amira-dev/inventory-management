import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAlertComponent } from './stock-alert.component';
import { AlertService } from '../alert.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockAlertService {
  getLowStockAlerts() {
    return of([]);
  }
}

describe('StockAlertComponent', () => {
  let component: StockAlertComponent;
  let fixture: ComponentFixture<StockAlertComponent>;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockAlertComponent],
      providers: [
        { provide: AlertService, useClass: MockAlertService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLowStockAlerts on init', () => {
    spyOn(alertService, 'getLowStockAlerts').and.callThrough();
    component.ngOnInit();
    expect(alertService.getLowStockAlerts).toHaveBeenCalled();
  });

  it('should clean up on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
