import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  // Declare the form
  productForm!: FormGroup;
  product: Product | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.initForm();

    // Get the product ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch the product details if the ID exists
      this.productService.getProduct(Number(id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((product: Product) => {
          this.product = product;
          // Patch the form with the product details
          this.productForm.patchValue(product);
        });
    }
  }

  // Initialize the product form with default values and validators
  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value as Product;
      if (this.product) {
        // Update the existing product
        this.updateProduct(product);
      } else {
        // Add a new product
        this.addProduct(product);
      }
    }
  }

  // Update the product
  private updateProduct(product: Product): void {
    this.productService.updateProduct({ ...this.product, ...product })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.navigateToProductList());
  }

  // Add a new product
  private addProduct(product: Product): void {
    this.productService.addProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.navigateToProductList());
  }

  // Navigate back to the product list
  navigateToProductList(): void {
    this.router.navigate(['/products']);
  }

  // Cleanup subscriptions
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
