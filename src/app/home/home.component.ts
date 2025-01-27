import { Component, inject, AfterViewInit } from '@angular/core'
import { AstroService } from '../service/astro.service';
// import { D3PlanetaryService } from '../service/d3planetary.service';
import { ThreePlanetaryService } from '../service/threeplanetary.service';
import { LocationService } from '../service/location.service';
import { ChartData } from '../types';
import { Space } from '../space/space.component';

@Component({
    selector: 'app-root',
    imports: [Space],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
    charts: ChartData[] | null = []
    astroService = inject(AstroService)
    // planetaryService = inject(D3PlanetaryService)
    planetaryService = inject(ThreePlanetaryService)
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
