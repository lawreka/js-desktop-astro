import { Component, inject, AfterViewInit } from '@angular/core'
import { ThreePlanetaryService } from '../service/threeplanetary.service';

@Component({
    selector: 'earth',
    imports: [],
    templateUrl: './earth.component.html',
    styleUrl: './earth.component.css'
})
export class Earth implements AfterViewInit {
    planetaryService = inject(ThreePlanetaryService)
    ngAfterViewInit(): void {
        this.planetaryService.createEarth()
    }
}
