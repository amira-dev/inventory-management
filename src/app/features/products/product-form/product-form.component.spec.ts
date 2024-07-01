import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../product.model';

class MockProductService {
  getProduct(id: number) {
    return of({ id, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM and 512GB SSD. Ideal for gaming, video editing, and heavy multitasking. Comes with a sleek design, backlit keyboard, and long battery life. Perfect for professionals and power users who need reliability and speed.', price: 1200, quantity: 50 });
  }

  addProduct(product: Product) {
    return of(product);
  }

  updateProduct(product: Product) {
    return of(product);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => '1'
    }
  };
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        FormBuilder,
        { provide: ProductService, useClass: MockProductService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product data on init if id is present', () => {
    expect(component.productForm.value).toEqual({
      name: 'Laptop Pro',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD. Ideal for gaming, video editing, and heavy multitasking. Comes with a sleek design, backlit keyboard, and long battery life. Perfect for professionals and power users who need reliability and speed.',
      price: 1200,
      quantity: 50,
    });
  });

  it('should add a new product on submit', () => {
    component.product = undefined;
    component.productForm.setValue({
      name: 'New Product',
      description: 'New Product Description',
      price: 100,
      quantity: 20,
    });

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should update an existing product on submit', () => {
    component.product = {
      id: 1,
      name: 'Laptop Pro',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD. Ideal for gaming, video editing, and heavy multitasking. Comes with a sleek design, backlit keyboard, and long battery life. Perfect for professionals and power users who need reliability and speed.',
      price: 1200,
      quantity: 50,
    };

    component.productForm.setValue({
      name: 'Updated Laptop Pro',
      description: 'Updated description for Laptop Pro.',
      price: 1250,
      quantity: 45,
    });

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should navigate back to the product list on navigateToProductList', () => {
    component.navigateToProductList();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should clean up on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
