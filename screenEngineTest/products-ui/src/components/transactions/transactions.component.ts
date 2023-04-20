import { Transaction } from './../../models/transaction.model';
import { Component } from '@angular/core';
import { TransactionService } from 'src/services/transaction.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateTransactionsComponent } from './create-transactions/create-transactions.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  page = 1;
  pageSize = 6;
  allTransactions: Transaction[] = [];
  transactions: Transaction[] = [];
  collectionSize = this.allTransactions.length;
  private modalRef!: NgbModalRef;

  constructor(
    private transactionService: TransactionService,
    private modalService: NgbModal
  ) {
    this.refreshTransaction();
  }

  ngOnInit() {
    this.getProductsList();
  }

  openTransactions() {
    this.modalRef = this.modalService.open(CreateTransactionsComponent);
    this.modalRef.result.then((result) => {
      this.getProductsList();
    });
  }

  getProductsList() {
    this.transactionService.getTransactions().subscribe({
      next: (res: Transaction[]) => {
        this.allTransactions = res;
        this.refreshTransaction();
      },
    });
  }

  refreshTransaction() {
    this.transactions = this.allTransactions
      .map((country, i) => ({
        ...country,
        id: i + 1,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    this.collectionSize = this.allTransactions.length;
  }
}
