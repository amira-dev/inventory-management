import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM and 512GB SSD. Ideal for gaming, video editing, and heavy multitasking. Comes with a sleek design, backlit keyboard, and long battery life. Perfect for professionals and power users who need reliability and speed.', price: 1200, quantity: 50 },
    { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with adjustable DPI settings. Offers precision and comfort for long hours of use. Compatible with various operating systems and features a long-lasting battery. Perfect for office work and casual gaming.', price: 25, quantity: 150 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch a single product by ID', () => {
    const mockProduct = mockProducts[0];

    service.getProduct(1).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('api/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should add a new product', () => {
    const newProduct: Product = { id: 3, name: 'New Product', description: 'New Product Description', price: 100, quantity: 20 };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne('api/products');
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update an existing product', () => {
    const updatedProduct: Product = { id: 1, name: 'Updated Laptop Pro', description: 'Updated description for Laptop Pro.', price: 1250, quantity: 45 };

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne('api/products/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });
});
