import { Component, OnInit, signal, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Transaction } from '../../../../core/interfaces/transaction.interface';
import { TransactionService } from '../../../../core/services/transaction.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart implements OnInit {
  private service = inject(TransactionService);

  listTransactions = signal<Transaction[]>([]);

  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {
    this.getTransactions();
  }

  public getTransactions(): void {
    this.service.getTranasctions().subscribe({
      next: (data) => {
        this.listTransactions.set(data);
        this.processDataForChart();
      },
      error: (err) => {
        console.error('Error al obtener transacciones', err);
      },
    });
  }

  private processDataForChart(): void {
    const totalByMonth = new Map<string, number>();
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    this.listTransactions().forEach((item) => {
      const dateObj = new Date(item.date); 
      const month = monthNames[dateObj.getMonth()];
      const amount = item.amount;
      
      const currentTotal = totalByMonth.get(month) || 0;
      totalByMonth.set(month, currentTotal + amount);
    });

    this.barChartData = {
      labels: Array.from(totalByMonth.keys()),
      datasets: [
        { 
          data: Array.from(totalByMonth.values()), 
          label: 'Total por Mes',
          backgroundColor: '#42A5F5' 
        }
      ]
    };
  }
}