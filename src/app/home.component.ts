import { Component } from '@angular/core';

interface Chart {
    id: string;
    name: string;
}

@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    charts: Chart[] | null = []
}
