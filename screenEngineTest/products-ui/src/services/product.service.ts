import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import env from 'src/config/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = `${env.API_URL}/products`;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }

  getSales() {
    return this.http.get(`${this.baseURL}/sales`);
  }

  createProducts(data: any) {
    return this.http.post(`${this.baseURL}/`, data);
  }

  getProductsDropdown() {
    return this.http.get(`${this.baseURL}/dropdown`);
  }
}
