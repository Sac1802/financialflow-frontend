import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/interfaces/transaction.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryUser } from '../../../core/interfaces/category.user.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-save-transaction',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './save-transaction.html',
  styleUrl: './save-transaction.css',
})
export class SaveTransaction implements OnInit{
  private service = inject(TransactionService);
  private serviceCategory = inject(CategoryService);
  private formBuilder = inject(FormBuilder);

  formTransaction: FormGroup;
  categories = signal<CategoryUser[]>([]);
  private dialogRef = inject(MatDialogRef<SaveTransaction>);

  ngOnInit(): void {
    this.getCategories();
  }

  constructor(){
    this.formTransaction = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      transactionType: ['', [Validators.required]],
      date: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  saveTransaction(): void{
    if(this.formTransaction.invalid){
      this.formTransaction.markAllAsTouched();
      return;
    }

    const {amount, transactionType, date, category, description} = this.formTransaction.value;

    this.service.saveTransaction({amount, transactionType, date, category, description}).subscribe({
      next: (data) => {
        console.log('Transaction created', data);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Transaction creation failed', err);
      }
    }); 
  }

  getCategories(): void{
    this.serviceCategory.getCategoriesByUser().subscribe({
      next: (data) => {
        this.categories.set(data);
        console.log('Categories', data);
      },
      error: (err) => {
        console.error('Categories failed', err);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
