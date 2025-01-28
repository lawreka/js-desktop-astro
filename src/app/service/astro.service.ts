import { Injectable } from '@angular/core';
import { Loc } from '../types';

@Injectable({
    providedIn: 'root'
})
export class AstroService {
    async getAstroNow(loc: Loc): Promise<any> {
        console.log(loc)
        const now = new Date(Date.now())
        const year = now.getUTCFullYear()
        const month = now.getUTCMonth() + 1
        const day = now.getUTCDate()
        const hour = now.getUTCHours()
        const minute = now.getUTCMinutes()
        const second = now.getUTCSeconds()
        // console.log(year, month, day, hour, minute, second)
        // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

        const planets = await fetch('http://localhost:3000/chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: year,
                month: month,
                day: day,
                hour: hour
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.planetPositions) {
                    return data.planetPositions
                }
            })

        return planets
    }
}
