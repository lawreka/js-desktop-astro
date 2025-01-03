import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AstroService } from './astro.service';
import { NavComponent } from './nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  astroService = inject(AstroService)
}
