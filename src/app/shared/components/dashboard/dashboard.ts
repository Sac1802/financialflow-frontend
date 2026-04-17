import { Component, inject, OnInit, signal } from '@angular/core';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { PieChart } from '../charts/pie-chart/pie-chart';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/interfaces/transaction.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { CategoryAmounts } from '../../../core/interfaces/category-amounts.interface';
import { SaveCategory } from '../save-category/save-category';
import { SaveTransaction } from '../save-transaction/save-transaction';
import { UserService } from '../../../core/services/user.service';
import { UserInfo } from '../../../core/interfaces/user.info.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [BarChart, PieChart, MatIconModule, MatButtonModule, MatDialogModule, MatMenuModule, CommonModule],
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
  private userService = inject(UserService);
  userInfo = signal<UserInfo>({});
  private authService = inject(AuthService);
  
  transactions: Transaction[] = [];
  categoriesData: CategoryAmounts[] = [];
  
  ngOnInit(): void {
    this.loadTransactions();
    this.getUserInfo();
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
  
  openSaveCategory(): void {
    this.dialog.open(SaveCategory, {
      width: '500px',
      disableClose: false,
      backdropClass: 'custom-backdrop'
    });
  }

  openSaveTransaction(): void {
    this.dialog.open(SaveTransaction, {
      width: '500px',
      disableClose: false,
      backdropClass: 'custom-backdrop'
    });
  }

  getUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo.set(data);
      },
      error: (error) => {
        console.error('Error loading user info:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.loadTransactions();
      },
      error: (error) => {
        console.error('Error deleting transaction:', error);
      }
    });
  }
}
