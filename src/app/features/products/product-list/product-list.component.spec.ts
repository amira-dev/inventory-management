import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockProductService {
  getProducts() {
    return of([
      { id: 1, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM and 512GB SSD. Ideal for gaming, video editing, and heavy multitasking. Comes with a sleek design, backlit keyboard, and long battery life. Perfect for professionals and power users who need reliability and speed.', price: 1200, quantity: 50 },
      { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with adjustable DPI settings. Offers precision and comfort for long hours of use. Compatible with various operating systems and features a long-lasting battery. Perfect for office work and casual gaming.', price: 25, quantity: 150 },
    ]);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource with products on init', () => {
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].name).toBe('Laptop Pro');
    expect(component.dataSource.data[1].name).toBe('Wireless Mouse');
  });

  it('should navigate to product details on viewProduct', () => {
    const productId = 1;
    component.viewProduct(productId);
    expect(router.navigate).toHaveBeenCalledWith(['/products/details', productId]);
  });

  it('should navigate to product edit on editProduct', () => {
    const productId = 1;
    component.editProduct(productId);
    expect(router.navigate).toHaveBeenCalledWith(['/products/edit', productId]);
  });

  it('should navigate to add product on navigateToAddProduct', () => {
    component.navigateToAddProduct();
    expect(router.navigate).toHaveBeenCalledWith(['/products/add']);
  });
});
