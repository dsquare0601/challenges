import { ProductService } from './../../services/product.service';
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public piechart: any;
  hasChartData = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.productService.getSales().subscribe({
      next: (res: any) => {
        if (!res.chartLabels?.length) this.hasChartData = false;
        this.renderChart(res.chartLabels, res.chartData);
      },
      error: (error) => {
        console.log('error :>> ', error);
      },
    });
  }

  renderChart(labels: string[], data: number[]) {
    this.piechart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(255, 205, 86)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
