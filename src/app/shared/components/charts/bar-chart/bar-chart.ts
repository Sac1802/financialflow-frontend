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
        console.log('Transactions received', data);
        this.listTransactions.set(data);
        this.processDataForChart();
      },
      error: (err) => {
        console.error('Error al obtener transacciones', err);
      },
    });
  }

  private processDataForChart(): void {
    const incomeByMonth = new Map<string, number>();
    const expenseByMonth = new Map<string, number>();
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    this.listTransactions().forEach((item) => {
      const dateObj = new Date(item.date);
      const month = monthNames[dateObj.getMonth()];
      const amount = item.amount;

      if (item.transactionType === 'INCOME') {
        const current = incomeByMonth.get(month) || 0;
        incomeByMonth.set(month, current + amount);
      } else if (item.transactionType === 'EXPENSE') {
        const current = expenseByMonth.get(month) || 0;
        expenseByMonth.set(month, current + amount);
      }
    });

    const allMonths = Array.from(new Set([...incomeByMonth.keys(), ...expenseByMonth.keys()]));

    this.barChartData = {
      labels: allMonths,
      datasets: [
        {
          data: allMonths.map(m => incomeByMonth.get(m) || 0),
          label: 'Ingresos',
          backgroundColor: '#66BB6A'
        },
        {
          data: allMonths.map(m => expenseByMonth.get(m) || 0),
          label: 'Gastos',
          backgroundColor: '#EF5350'
        }
      ]
    };
  }
}