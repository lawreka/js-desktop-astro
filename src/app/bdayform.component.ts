import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface City {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
}

interface State {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
    cities: City[];
}

interface Country {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
    states: State[]
}

@Component({
    selector: 'bday-form',
    imports: [FormsModule],
    templateUrl: './bdayform.component.html'
})
export class BdayForm implements OnInit {
    countries: Country[] | null = null
    getCountries() {
        fetch('./countries+states+cities.json')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.countries = json
                return json
            }
            );
    }
    ngOnInit(): void {
        this.getCountries()
    }
    selectedCountryIndex: number | null = null
    selectedStateIndex: number | null = null
    selectedCityIndex: number | null = null
    states: any = null
    cities: any = null
    getCountryNameByIndex(idx: number): string {
        const country = this.countries?.[idx]
        return country?.name || ''
    }
    getStateNameByIndex(idx: number): string {
        const state = this.states?.[idx]
        return state?.name || ''
    }
    getCityNameByIndex(idx: number): string {
        const city = this.cities?.[idx]
        return city?.name || ''
    }
    resetStatesAndCities() {
        this.selectedStateIndex = null;
        this.states = null
        this.selectedCityIndex = null;
        this.cities = null
    }
    resetCities() {
        this.selectedCityIndex = null;
        this.cities = null;
    }
    getStates(country: Country) {
        this.resetStatesAndCities()
        const states = country.states
        console.log(states)
        if (states.length > 0) {
            this.states = states
        } else {
            const { latitude, longitude } = country;
            this.setBirthLoc(latitude, longitude)
        }
    }
    getCities(state: State) {
        this.resetCities()
        const cities = state.cities
        console.log(cities)
        if (cities.length > 0) {
            this.cities = cities
        } else {
            const { latitude, longitude } = state;
            this.setBirthLoc(latitude, longitude)
        }
    }
    setBirthLoc(latitude: string, longitude: string) {
        console.log("Born at ", latitude, longitude)
    }
}
