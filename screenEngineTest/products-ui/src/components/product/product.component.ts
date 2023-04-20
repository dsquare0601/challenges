import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { CreateProductsComponent } from './create-products/create-products.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  private modalRef!: NgbModalRef;
  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {
    this.refreshProducts();
  }

  ngOnInit() {
    this.getProductsList();
  }

  openProducts() {
    this.modalRef = this.modalService.open(CreateProductsComponent);
    this.modalRef.result.then((result) => {
      this.getProductsList();
    });
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
