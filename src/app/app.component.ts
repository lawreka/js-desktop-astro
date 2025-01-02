import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BdayForm } from './bdayform.component';
import { AstroService } from './astro.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BdayForm],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  astroService = inject(AstroService)
}
