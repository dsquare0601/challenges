import { Transaction } from './../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from 'src/config/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  baseURL = `${env.API_URL}/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get<Transaction[]>(`${this.baseURL}`);
  }

  addTransactions(data: any) {
    return this.http.post(`${this.baseURL}/`, data);
  }
}
