import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-category',
  imports: [],
  templateUrl: './save-category.html',
  styleUrl: './save-category.css',
})
export class SaveCategory {
  private service = inject(CategoryService);
  categoryForm: FormGroup;
  private fb = inject(FormBuilder);

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
      },
      error: (err) => {
        console.error('Category creation failed', err);
      },
    });
  }
}
