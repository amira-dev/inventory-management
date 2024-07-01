import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL for the Mock Service Worker
  private baseUrl = 'api/products';

  constructor(private http: HttpClient) { }

  /**
   * Get all products.
   * @returns {Observable<Product[]>} An observable containing the list of products.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  /**
   * GET a product by its ID.
   * @param {number} id - The ID of the product.
   * @returns {Observable<Product>} An observable containing the product.
   */
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  /**
   * Adds a new product.
   * @param {Product} product - The product to add.
   * @returns {Observable<Product>} An observable containing the added product.
   */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  /**
   * Updates an existing product.
   * @param {Product} product - The product to update.
   * @returns {Observable<Product>} An observable containing the updated product.
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }
}
