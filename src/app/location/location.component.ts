import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { LocationService } from '../service/location.service'
import { City, State, Country, LocationFormState } from '../types'
import { saveAppData } from '../storage'

@Component({
    selector: 'location-form',
    imports: [FormsModule],
    templateUrl: './location.component.html',
    styleUrl: './location.component.css'
})
export class Location implements OnInit {
    locationService = inject(LocationService)
    formState: LocationFormState = {
        country: null,
        state: null,
        city: null,
        loc: { lat: '', lon: '' }
    }
    formComplete = false
    checkFormComplete() {
        const complete = Boolean(this.formState.loc.lat !== '' && this.formState.loc.lon !== '')
        this.formComplete = complete
    }
    countries: Country[] | null = null
    async getCountries(): Promise<any> {
        let countries = await this.locationService.getCountries()
        this.countries = countries
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
    resetCountry() {
        this.formState.loc = { lat: '', lon: '' }
        this.formState.state = null
        this.selectedStateIndex = null
        this.states = null
        this.formState.city = null
        this.selectedCityIndex = null
        this.cities = null
    }
    resetState() {
        this.formState.city = null
        this.selectedCityIndex = null
        this.cities = null
    }
    setCountry(country: Country) {
        this.resetCountry()
        this.formState.country = country
        const { latitude, longitude } = country
        this.setLoc(latitude, longitude)
        const states = country.states
        if (states.length > 0) {
            this.states = states
        }
    }
    setState(state: State) {
        this.resetState()
        this.formState.state = state
        const { latitude, longitude } = state
        this.setLoc(latitude, longitude)
        const cities = state.cities
        if (cities.length > 0) {
            this.cities = cities
        }
    }
    setCity(city: City) {
        this.formState.city = city
        const { latitude, longitude } = city
        this.setLoc(latitude, longitude)
    }
    setLoc(latitude: string, longitude: string) {
        this.formState.loc = { lat: latitude, lon: longitude }
        this.checkFormComplete()
    }
    submitLocation(): void {
        const tz = this.locationService.getUserTimezone()
        const data = { ...this.formState, tz: tz }
        saveAppData(data)
    }
}
