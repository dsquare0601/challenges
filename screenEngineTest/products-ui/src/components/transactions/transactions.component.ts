import { Transaction } from './../../models/transaction.model';
import { Component } from '@angular/core';
import { TransactionService } from 'src/services/transaction.service';

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

  constructor(private transactionService: TransactionService) {
    this.refreshTransaction();
  }

  ngOnInit() {
    this.getProductsList();
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
