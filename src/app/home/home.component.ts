import { Component, inject, AfterViewInit } from '@angular/core'
import { AstroService } from '../service/astro.service';
// import { PlanetaryService } from '../service/d3planetary.service';
import { LocationService } from '../service/location.service';
import { ChartData } from '../types';

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
    charts: ChartData[] | null = []
    astroService = inject(AstroService)
    // planetaryService = inject(PlanetaryService)
    locationService = inject(LocationService)
    async getCountries(): Promise<any> {
        const countries = await this.locationService.getCountries()
        // console.log(countries);
    }
    ngAfterViewInit(): void {
        // console.log(this.astroService.now)
        this.getCountries()
        // this.planetaryService.drawGlobe()
    }

}
