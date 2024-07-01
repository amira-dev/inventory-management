import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Observable, of } from 'rxjs';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // Observable for the product details
  product$!: Observable<Product | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Get the product ID from the snapshot of the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    // Fetch product details if the ID exists
    this.product$ = id ? this.productService.getProduct(parseInt(id, 10)) : of(null);
  }

  // Navigate back to the product list
  goBack(): void {
    this.router.navigate(['/products']);
  }


}
