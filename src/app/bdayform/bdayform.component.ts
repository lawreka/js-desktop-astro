import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment-timezone';
import { LocationService } from '../service/location.service';
import { City, State, Country, BdayFormState } from '../types'

@Component({
    selector: 'bday-form',
    imports: [FormsModule],
    templateUrl: './bdayform.component.html',
    styleUrl: './bdayform.component.css'
})
export class BdayForm implements OnInit {
    locationService = inject(LocationService)
    formState: BdayFormState = {
        id: crypto.randomUUID(),
        name: '',
        bDay: '',
        bTime: '',
        bCountry: null,
        bState: null,
        bCity: null,
        bLoc: { lat: '', lon: '' },
        bTzName: ''
    }
    formComplete = false
    checkFormComplete() {
        const complete = Boolean(this.formState.name !== '' && this.formState.bDay !== '' && this.formState.bTime !== '' && this.formState.bLoc.lat !== '' && this.formState.bLoc.lon !== '' && this.formState.bTzName !== '')
        this.formComplete = complete
    }
    setName(name: string) {
        this.formState.name = name
        this.checkFormComplete()
    }
    setBday(bday: string) {
        this.formState.bDay = bday
        this.checkFormComplete()
    }
    setBtime(btime: any) {
        this.formState.bTime = btime
        this.checkFormComplete()
    }
    timezones: string[] | null = null
    countries: Country[] | null = null
    async getCountries(): Promise<any> {
        let countries = await this.locationService.getCountries()
        // console.log(countries)
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
        this.formState.bLoc = { lat: '', lon: '' }
        this.formState.bTzName = ''
        this.timezones = null
        this.formState.bState = null
        this.selectedStateIndex = null
        this.states = null
        this.formState.bCity = null
        this.selectedCityIndex = null
        this.cities = null
    }
    resetState() {
        this.formState.bCity = null
        this.selectedCityIndex = null
        this.cities = null
    }
    displayTimezones(country: Country) {
        // console.log(country)
        const countryIso = country.iso2
        const tzs = moment.tz.zonesForCountry(countryIso)
        if (tzs.length == 1) {
            this.formState.bTzName = tzs[0]
        } else {
            this.timezones = tzs
        }
    }
    setBirthCountry(country: Country) {
        this.resetCountry()
        this.formState.bCountry = country
        this.displayTimezones(country)
        const { latitude, longitude } = country
        this.setBirthLoc(latitude, longitude)
        const states = country.states
        if (states.length > 0) {
            this.states = states
        }
    }
    setBirthState(state: State) {
        this.resetState()
        this.formState.bState = state
        const { latitude, longitude } = state
        this.setBirthLoc(latitude, longitude)
        const cities = state.cities
        if (cities.length > 0) {
            this.cities = cities
        }
    }
    setBirthCity(city: City) {
        this.formState.bCity = city
        const { latitude, longitude } = city
        this.setBirthLoc(latitude, longitude)
    }
    setBirthLoc(latitude: string, longitude: string) {
        this.formState.bLoc = { lat: latitude, lon: longitude }
        this.checkFormComplete()
    }
    setBirthTZ(tz: string) {
        this.formState.bTzName = tz
        this.checkFormComplete()
    }
    calculateChart(): void {
        console.log(this.formState)
    }
}
