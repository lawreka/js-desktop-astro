export interface City {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
}

export interface State {
    name: string;
    id: string;
    latitude: string;
    longitude: string;
    cities: City[];
}

export interface Timezone {
    abbreviation: string;
    gmtOffset?: number;
    gmtOffsetName?: string;
    tzName: string;
    zoneName: string;
}

export interface Country {
    name: string;
    id: string;
    iso2: string;
    latitude: string;
    longitude: string;
    states: State[];
    timezones: Timezone[];
}

export interface BdayFormState {
    id: string
    name: string
    bDay: string
    bTime: string
    bCountry: Country | null
    bState: State | null
    bCity: City | null
    bLoc: { lat: string; lon: string }
    bTzName: string;
}

export interface AppData {
    country: Country | null
    state: State | null
    loc: { lat: string; lon: string }
}

export interface ChartData {
    id: string
    name: string
    bDay: string
    bTime: string
    bTzName: string;
    bLoc: { lat: string; lon: string }
}
