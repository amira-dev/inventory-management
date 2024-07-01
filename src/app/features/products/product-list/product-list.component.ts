import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  // Data source for the table
  dataSource = new MatTableDataSource<Product>();

  // Columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'actions'];

  // Paginator for the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Fetch products from the ProductService and set the data source
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => {
        this.dataSource.data = products;
        this.dataSource.paginator = this.paginator;
      });
  }

  // Navigate to the product details view
  viewProduct(id: number): void {
    this.router.navigate(['/products/details', id]);
  }

  // Navigate to the product edit view
  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  // Navigate to the add product view
  navigateToAddProduct(): void {
    this.router.navigate(['/products/add']);
  }

  // Cleanup subscriptions
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
