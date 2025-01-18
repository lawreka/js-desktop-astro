import { AppData, ChartData } from '../types'

const APP_DATA_STORAGE_KEY = "js-desktop-astro"
const CHARTS_STORAGE_KEY = "js-desktop-astro-charts"

export const getSavedAppData = (): AppData | null => {
    if (typeof window === 'undefined') {
        return null
    }

    const data = localStorage.getItem(APP_DATA_STORAGE_KEY)
    return data ? JSON.parse(data) : null
}

export const saveAppData = (data: AppData): void => {
    if (typeof window === 'undefined') {
        return
    }
    localStorage.setItem(APP_DATA_STORAGE_KEY, JSON.stringify(data))
}

export const getSavedChartsData = (): ChartData | null => {
    if (typeof window === 'undefined') {
        return null
    }

    const data = localStorage.getItem(CHARTS_STORAGE_KEY)
    return data ? JSON.parse(data) : null
}
