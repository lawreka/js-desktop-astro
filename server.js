const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const sweph = require('sweph')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const jsonParser = bodyParser.json()

const port = 3000;

const getJulDay = (y, m, d, h) => {
    return sweph.julday(y, m, d, h, sweph.constants.SE_GREG_CAL)
}

const getPos = (planet, time) => {
    const flags = sweph.constants.SEFLG_SWIEPH | sweph.constants.SEFLG_SPEED;
    const result = sweph.calc(time, planet, flags)
    if (result.flag === sweph.constants.ERR) {
        console.log(result.error)
        return null
    } else {
        const { data } = result;
        return {
            planet: sweph.get_planet_name(planet),
            lon: data[0],
            lat: data[1],

        }
    }
}

const planets = [sweph.constants.SE_SUN, sweph.constants.SE_MOON, sweph.constants.SE_MARS, sweph.constants.SE_VENUS, sweph.constants.SE_JUPITER, sweph.constants.SE_SATURN, sweph.constants.SE_URANUS, sweph.constants.SE_NEPTUNE, sweph.constants.SE_PLUTO]


app.post('/chart', jsonParser, (req, res) => {
    const { year, month, day, hour } = req.body
    const julday = getJulDay(year, month, day, hour)
    const planetPositions = []
    planets.map((planet) => {
        planetPositions.push(getPos(planet, julday))
    })
    // const houses = sweph.houses()
    res.json({ planetPositions: planetPositions });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
