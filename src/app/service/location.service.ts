import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    async getCountries(): Promise<any> {
        const countries = await fetch('http://localhost:3000/countries')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                if (data.countries) {
                    return data.countries
                }
            });
        return countries
    }
    getUserTimezone(): string {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        return tz
    }
}
