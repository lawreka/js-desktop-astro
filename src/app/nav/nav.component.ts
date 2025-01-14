import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'nav',
    imports: [RouterLink],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent { }
