import { Component, inject, Input, AfterViewInit } from '@angular/core'
import { ThreePlanetaryService } from '../service/threeplanetary.service'
import { Planet } from '../types'

@Component({
    selector: 'chart',
    imports: [],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.css'
})
export class Chart implements AfterViewInit {
    @Input() planetaryData: Planet[] | null = null
    planetaryService = inject(ThreePlanetaryService)
    ngAfterViewInit(): void {
        this.planetaryService.createChart(this.planetaryData)
    }
}
