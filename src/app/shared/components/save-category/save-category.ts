import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-save-category',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './save-category.html',
  styleUrl: './save-category.css',
})
export class SaveCategory {
  private service = inject(CategoryService);
  categoryForm: FormGroup;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<SaveCategory>);

  constructor(){
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      TransactionType: ['', [Validators.required]]
    });
  }


  saveCategory(): void{
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { name, TransactionType } = this.categoryForm.value;

    this.service.saveNewCategory({ name, TransactionType }).subscribe({
      next: (data) => {
        console.log('Category created');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Category creation failed', err);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
