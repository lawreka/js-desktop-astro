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

export interface Loc {
    lat: string;
    lon: string;
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
    bLoc: Loc
    bTzName: string;
}

export interface AppData {
    loc: Loc
    tz: string;
}

export interface ChartData {
    id: string
    name: string
    bDay: string
    bTime: string
    bTzName: string;
    bLoc: Loc
}

export interface LocationFormState {
    country: Country | null
    state: State | null
    city: City | null
    loc: Loc
}

export interface Planet {
    planet: string;
    lat: number;
    lon: number;
}
