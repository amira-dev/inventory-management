import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockListComponent } from './stock-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StockService } from '../stock.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockListComponent, StockChartComponent],
      imports: [HttpClientTestingModule, MatTableModule, MatPaginatorModule],
      providers: [StockService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
