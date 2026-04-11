import { Component, inject, OnInit, signal } from '@angular/core';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { PieChart } from '../charts/pie-chart/pie-chart';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/interfaces/transaction.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { CategoryAmounts } from '../../../core/interfaces/category-amounts.interface';
import { SaveCategory } from '../save-category/save-category';
import { SaveTransaction } from '../save-transaction/save-transaction';

@Component({
  selector: 'app-dashboard',
  imports: [BarChart, PieChart, MatIconModule, MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [DatePipe]
})
export class Dashboard implements OnInit {
  private transactionService = inject(TransactionService);
  money_earned = signal<number>(0);
  money_spent = signal<number>(0);
  balance = signal<number>(0);
  private dialog = inject(MatDialog);
  
  transactions: Transaction[] = [];
  categoriesData: CategoryAmounts[] = [];
  
  ngOnInit(): void {
    this.loadTransactions();
  }
  
  loadTransactions(): void {
    this.transactionService.getTranasctions().subscribe({
      next: (data) => {
        console.log(data);
        this.transactions = data;
        this.money_earned.set(data.filter(t => t.transactionType === 'INCOME').reduce((acc, t) => acc + t.amount, 0));
        this.money_spent.set(data.filter(t => t.transactionType === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0));
        this.balance.set(this.money_earned() - this.money_spent());
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  onCategoriesLoaded(data: CategoryAmounts[]) {
    this.categoriesData = data;
    
  }
  
  openSaveCategory() {
    this.dialog.open(SaveCategory, {
      width: '500px',
      disableClose: false,
      backdropClass: 'custom-backdrop'
    });
  }

  openSaveTransaction() {
    this.dialog.open(SaveTransaction, {
      width: '500px',
      disableClose: false,
      backdropClass: 'custom-backdrop'
    });
  }
}
