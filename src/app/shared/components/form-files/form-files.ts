import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateExcelService } from '../../../core/services/generate-excel.service';
import { GeneratePdfService } from '../../../core/services/generate-pdf.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-files',
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './form-files.html',
  styleUrl: './form-files.css',
})
export class FormFiles {
  private generateExcelService = inject(GenerateExcelService);
  private generatePdfService = inject(GeneratePdfService);
  private formBuilder = inject(FormBuilder);

  form: FormGroup;
  private dialogRef = inject(MatDialogRef<FormFiles>);
  file: 'excel' | 'pdf' = 'excel';
  
  constructor(){
    this.form = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }

  getExcel(): void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {startDate, endDate} = this.form.value;
    
    this.generateExcelService.generateExcel(new Date(startDate), new Date(endDate)).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'reporte.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Excel generation failed', err);
      }
    });
  }

  getPDF(): void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {startDate, endDate} = this.form.value;
    
    this.generatePdfService.generatePdf(new Date(startDate), new Date(endDate)).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'reporte.pdf', 'application/pdf');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('PDF generation failed', err);
      }
    });
  }

  setFileType(type: 'excel' | 'pdf'): void {
    this.file = type;
  }

  close(): void {
    this.dialogRef.close();
  }

  private downloadFile(blob: Blob, fileName: string, mimeType: string): void {
    const url = window.URL.createObjectURL(new Blob([blob], { type: mimeType }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
