import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartData } from '../types';

@Component({
    selector: 'charts',
    imports: [RouterLink],
    templateUrl: './charts.component.html',
    styleUrl: './charts.component.css'
})
export class Charts {
    charts: ChartData[] | null = []
}
