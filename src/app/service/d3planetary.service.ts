import { Injectable } from '@angular/core';
import * as d3 from 'd3'

@Injectable({
    providedIn: 'root'
})
export class D3PlanetaryService {
    drawGlobe(): void {
        let projection1 = d3.geoOrthographic().scale(100).rotate([0, 135, 0])
        let projection2 = d3.geoOrthographic().scale(150).rotate([0, 135, 0])
        let projection3 = d3.geoOrthographic().scale(200).rotate([0, 135, 0])

        let graticule = d3.geoGraticule();

        let geoGenerator1 = d3.geoPath(projection1)
        let geoGenerator2 = d3.geoPath(projection2)
        let geoGenerator3 = d3.geoPath(projection3)

        let venusDot = d3.geoCircle()
            .center([341.83813956854095, -0.22891008868154278])
            .radius(5)
        let circle = venusDot()

        let svg = d3.select("#globe")
            .append("svg")
            .attr('width', '100%')
            .attr('height', '100%')

        let earth = d3.select("#globe svg")
            .append("path")
            .datum(graticule())
            .attr('d', geoGenerator1);

        let venus = d3.select("#globe svg")
            .append("path")
            .datum(graticule())
            .attr('d', geoGenerator2)
            .attr('stroke', '#ffff0042')
            .attr('fill', 'transparent')

        let planet = d3.select("#globe svg")
            .append('path')
            .datum(venusDot())
            .attr('d', geoGenerator2)

        let mars = d3.select("#globe svg")
            .append("path")
            .datum(graticule())
            .attr('d', geoGenerator3)
            .attr('stroke', '#ffff0042')
            .attr('fill', 'transparent')

    }
}
