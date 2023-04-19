import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  page = 1;
  pageSize = 6;
  allProducts: Product[] = [];
  products: Product[] = [];
  collectionSize = this.allProducts.length;

  constructor(private productService: ProductService) {
    this.refreshProducts();
  }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.allProducts = res;
        this.refreshProducts();
      },
    });
  }

  refreshProducts() {
    this.products = this.allProducts
      .map((country, i) => ({
        ...country,
        id: i + 1,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    this.collectionSize = this.allProducts.length;
  }
}
