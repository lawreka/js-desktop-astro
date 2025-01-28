import { Component, inject, OnInit } from '@angular/core'
import { Location } from '../location/location.component';
import { getSavedAppData } from '../storage';
import { Earth } from '../earth/earth.component';
import { AstroService } from '../service/astro.service';
import { AppData, Planet } from '../types';
import { Chart } from '../chart/chart.component';

@Component({
    selector: 'app-root',
    imports: [Location, Earth, Chart],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    requestLocation: boolean = false
    astroService = inject(AstroService)
    planetaryData: Planet[] | null = null
    async getChartNow(data: AppData): Promise<any> {
        console.log(data)
        const planets = await this.astroService.getAstroNow(data.loc)
        this.planetaryData = planets
    }
    ngOnInit(): void {
        const data = getSavedAppData()
        if (!data) {
            this.requestLocation = true
        } else {
            this.getChartNow(data)
        }
    }
}
