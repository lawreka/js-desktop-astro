import { Component, Input, inject, AfterViewInit, OnInit } from '@angular/core'
import { ThreePlanetaryService } from '../service/threeplanetary.service';

@Component({
    selector: 'space',
    imports: [],
    templateUrl: './space.component.html',
    styleUrl: './space.component.css'
})
export class Space implements OnInit {
    planetaryService = inject(ThreePlanetaryService)
    ngOnInit(): void {
        this.planetaryService.createScene()
    }
}
