import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AstroService {
    getAstro(): void {
        console.log("hello")
    }
}
