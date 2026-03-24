import { Component } from '@angular/core';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { PieChart } from '../charts/pie-chart/pie-chart';
@Component({
  selector: 'app-dashboard',
  imports: [BarChart, PieChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
