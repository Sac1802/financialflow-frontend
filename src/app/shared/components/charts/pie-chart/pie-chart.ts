import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CategoryAmounts } from '../../../../core/interfaces/category-amounts.interface';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})
export class PieChart implements OnInit {
  private service = inject(CategoryService);
  listCategories = signal<CategoryAmounts[]>([]);

  public pieCahetType: ChartType = 'pie';
  public pieChartOption: ChartConfiguration['options'] = {
    responsive: true,
  };

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.service.getCategoryAmounts().subscribe({
      next: (data) => {
        this.listCategories.set(data);
        console.log(this.listCategories());
      },
      error: (error) => {
        console.error('Error al obtener categorias', error);
      },
    });
  }

  public processDataForChart(): void {
    this.pieChartData = {
      labels: this.listCategories().map((item) => item.namenameCategory),
      datasets: [
        {
          data: this.listCategories().map((item) => item.amount),
        },
      ],
    };
  }
}
