import { CreateProductsComponent } from './../components/product/create-products/create-products.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsComponent } from './../components/transactions/transactions.component';
import { ProductComponent } from './../components/product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {
  NgbDatepickerModule,
  NgbModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { CreateTransactionsComponent } from 'src/components/transactions/create-transactions/create-transactions.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    ProductComponent,
    TransactionsComponent,
    CreateProductsComponent,
    CreateTransactionsComponent,
  ],
  exports: [SidebarComponent, NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
})
export class SharedModule {}
