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

interface Timezone {
    abbreviation?: string;
    gmtOffset?: number;
    gmtOffsetName?: string;
    tzName: string;
    zoneName: string;
}

interface Country {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
    states: State[];
    timezones: Timezone[];
}

@Component({
    selector: 'bday-form',
    imports: [FormsModule],
    templateUrl: './bdayform.component.html',
    styleUrl: './bdayform.component.css'
})
export class BdayForm implements OnInit {
    uuid = crypto.randomUUID()
    name: string = ''
    setName(name: string) {
        this.name = name
    }
    birthday: string = ''
    setBday(bday: string) {
        this.birthday = bday
    }
    birthtime: string = ''
    setBtime(btime: any) {
        this.birthtime = btime
    }
    birthCountry: Country | null = null
    birthState: State | null = null
    birthCity: City | null = null
    birthloc: { lat: string; lon: string } = { lat: '', lon: '' }
    birthTZ: Timezone | null = null
    birthTZindex: number | null = null
    timezones: Timezone[] | null = null
    countries: Country[] | null = null
    getCountries() {
        fetch('./countries+states+cities.json')
            .then((response) => response.json())
            .then((json) => {
                // console.log(json)
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
    resetTimezonesStatesAndCities() {
        this.birthTZ = null
        this.timezones = null
        this.birthState = null
        this.selectedStateIndex = null
        this.states = null
        this.birthCity = null
        this.selectedCityIndex = null
        this.cities = null
    }
    resetCities() {
        this.birthCity = null
        this.selectedCityIndex = null
        this.cities = null
    }
    setBirthCountry(country: Country) {
        this.resetTimezonesStatesAndCities()
        this.birthCountry = country
        const timezones = country.timezones
        if (timezones.length == 1) {
            this.birthTZ = country.timezones[0]
        } else {
            this.timezones = country.timezones
        }
        const { latitude, longitude } = country
        this.setBirthLoc(latitude, longitude)
        const states = country.states
        if (states.length > 0) {
            this.states = states
        }
    }
    setBirthState(state: State) {
        this.resetCities()
        this.birthState = state
        const { latitude, longitude } = state
        this.setBirthLoc(latitude, longitude)
        const cities = state.cities
        if (cities.length > 0) {
            this.cities = cities
        }
    }
    setBirthCity(city: City) {
        this.birthCity = city
        const { latitude, longitude } = city
        this.setBirthLoc(latitude, longitude)
    }
    setBirthLoc(latitude: string, longitude: string) {
        this.birthloc = { lat: latitude, lon: longitude }
    }
    setBirthTZ(timezone: Timezone) {
        this.birthTZ = timezone
    }
    calculateChart(): void {
        console.log(this.name)
        console.log(this.birthday)
        console.log(this.birthtime)
        console.log(this.birthCountry)
        console.log(this.birthState)
        console.log(this.birthCity)
        console.log(this.birthloc)
        console.log(this.birthTZ)
    }
}
