import { Component, inject, AfterViewInit } from '@angular/core'
import { AstroService } from '../astro.service'
import * as d3 from 'd3'

interface Chart {
    id: string;
    name: string;
}

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
    charts: Chart[] | null = []
    astroService = inject(AstroService)
    drawGlobe(): void {
        let projection;
        projection = d3.geoOrthographic()

        let graticule = d3.geoGraticule();

        let geoGenerator = d3.geoPath(projection)
        let svg = d3.select("#globe")
            .append("svg")
            .attr('width', '100%')
            .attr('height', '100%')
        let path = d3.select("#globe svg")
            .append("path")
            .datum(graticule())
            .attr('d', geoGenerator);

    }
    ngAfterViewInit(): void {
        console.log(this.astroService.now)
        this.drawGlobe()
    }
}
