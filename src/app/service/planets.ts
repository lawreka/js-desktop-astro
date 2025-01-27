import * as THREE from 'three';

// planet scale relative to the size of the sun
const planets = [
    {
        name: 'sun',
        scale: 100
    },
    {
        name: 'mercury',
        scale: 0.35

    },
    {
        name: 'venus',
        scale: 0.87
    },
    {
        name: 'earth',
        scale: 0.92
    },
    {
        name: 'mars',
        scale: 0.49
    },
    {
        name: 'jupiter',
        scale: 10.29
    },
    {
        name: 'saturn',
        scale: 8.67
    },
    {
        name: 'uranus',
        scale: 3.68
    },
    {
        name: 'neptune',
        scale: 3.56
    },
    {
        name: 'pluto',
        scale: 0.17
    }]

const planetScales = {
    'earth': 0.092
}

const scene = new THREE.Scene();
let earthXPos: any
let sunlight: any
const earthGroup = new THREE.Group()
const loader = new THREE.TextureLoader();
const moonGroup = new THREE.Group()
const sunGroup = new THREE.Group()
const earthPosition = new THREE.Vector3(earthXPos, 0, 0)

const renderEarth = (scale: number, xPos: number) => {
    const earthGeometry = new THREE.SphereGeometry(scale);
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("./earth_day_4096.jpg"),
        bumpMap: loader.load('./earth_bump.png'),
        emissiveMap: loader.load('./night_lights_modified.png'),
        emissive: new THREE.Color(0xFFFF9C),
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth);

    const cloudsMap = loader.load('./earthclouds.png')
    const cloudsGeometry = new THREE.SphereGeometry(scale * 1.01)
    const cloudsMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xFFFFFF),
        alphaMap: cloudsMap,
        transparent: true,
        opacity: 0.8
    })
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
    earthGroup.add(clouds)

    earthGroup.rotation.z = -23.4 * Math.PI / 180
    earthGroup.position.set(xPos, 0, 0)
    scene.add(earthGroup)
}

const addMoon = (earthScale: number, xPos: number) => {
    const moonGeometry = new THREE.SphereGeometry(earthScale * 0.27)
    const moonTexture = loader.load('./moon.jpg')
    const moonBumps = loader.load('./moonbumps.jpg')
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: moonTexture,
        bumpMap: moonBumps
    })
    const moon = new THREE.Mesh(moonGeometry, moonMaterial)
    moonGroup.position.set(xPos, 1, 2)
    moonGroup.add(moon)
    scene.add(moonGroup)
}


const createPlanets = () => {
    const addSunlight = (xPos: number) => {
        sunlight = new THREE.DirectionalLight('#ffffff', 3);
        sunlight.position.set(xPos, 0, 0);
        scene.add(sunlight);
    }

    let xPos = -500
    for (let planet of planets) {
        if (planet.name == "sun") {
            addSunlight(xPos)
        }
        if (planet.name == "earth") {
            renderEarth(planet.scale, xPos)
            addMoon(planet.scale, xPos)
            earthXPos = xPos
        } else {
            const geometry = new THREE.SphereGeometry(planet.scale);
            const texture = loader.load(`./${planet.name}.jpg`);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(xPos, 0, 0)
            if (planet.name == "sun") {
                sunGroup.add(sphere)
                scene.add(sunGroup)
            } else {
                scene.add(sphere)
            }
        }
        xPos = xPos + 200
    }
}

export const createSun = () => {
    const sunGeometry = new THREE.SphereGeometry();
    const sunMaterial = new THREE.MeshStandardMaterial({
        emissiveMap: loader.load('./sun.jpg'),
        emissive: new THREE.Color(0xFFFFFF)
    })
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
    return sunMesh
}

export const createMoon = () => {
    const moonGeometry = new THREE.SphereGeometry(planetScales['earth'] * 0.27)
    const moonTexture = loader.load('./moon.jpg')
    const moonBumps = loader.load('./moonbumps.jpg')
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: moonTexture,
        bumpMap: moonBumps
    })
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial)
    return moonMesh
}

export const createClouds = () => {
    const earthScale = planetScales['earth']

    const cloudsMap = loader.load('./earthclouds.png')
    const cloudsGeometry = new THREE.SphereGeometry(earthScale * 1.01)
    const cloudsMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xFFFFFF),
        alphaMap: cloudsMap,
        transparent: true,
        opacity: 0.8
    })
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
    return cloudsMesh
}

export const createEarth = () => {
    const earthGroup = new THREE.Group;
    const earthScale = planetScales['earth']

    const tilt = 0.41; // earth, atmosphere, axis line tilt in radians

    // earth mesh
    const earthGeometry = new THREE.SphereGeometry(earthScale);
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("./earth_day_4096.jpg"),
        bumpMap: loader.load('./earth_bump.png'),
        emissiveMap: loader.load('./night_lights_modified.png'),
        emissive: new THREE.Color(0xFFFF9C),
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.rotation.z = tilt

    // earth axis (north and south poles)

    const axisPoints = [
        new THREE.Vector3(0, earthScale * 1.5, 0),
        new THREE.Vector3(0, -earthScale * 1.5, 0)
    ]
    const axisGeometry = new THREE.BufferGeometry().setFromPoints(axisPoints) // create geometry from axis points
    const axisMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xff0000),
        transparent: true,
        opacity: 0.4
    })
    const axis = new THREE.Line(axisGeometry, axisMaterial)

    const clouds = createClouds()
    earthGroup.add(clouds)

    const moon = createMoon()
    earthGroup.add(moon)
    moon.position.set(0.5, 0, 0)

    earthGroup.add(earth);
    earthGroup.add(axis)
    earthGroup.rotation.y = tilt
    return {
        earthGroup,
        earth,
        moon,
        clouds
    }
}

export const createEarthOrbit = () => {
    // earth orbit path
    const orbitCurve = new THREE.EllipseCurve(
        0, 0,              // center x, y
        3, 3,          // radius x, y
        0, 2 * Math.PI       // start, end angles (0, 360 degrees) 
    )

    const orbitPoints = orbitCurve.getSpacedPoints(365)
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints) // create geometry from points on ellipse
    const orbitMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xff0000),
        transparent: true,
        opacity: 0.4
    })

    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial)
    orbitLine.rotateX(-Math.PI / 2) // rotate -90 degrees to orbit around y axis
    return {
        earthOrbitCurve: orbitCurve,
        earthOrbitLine: orbitLine
    }
}

export const createEcliptic = () => {
    const eclipticCurve = new THREE.EllipseCurve(
        0, 0,
        10, 10,
        0, 2 * Math.PI
    )
    const eclipticPoints = eclipticCurve.getSpacedPoints(360)
    const eclipticGeometry = new THREE.BufferGeometry().setFromPoints(eclipticPoints)
    const eclipticMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x00ffff),
        transparent: true,
        opacity: 0.4
    })
    const eclipticMesh = new THREE.Line(eclipticGeometry, eclipticMaterial)
    eclipticMesh.rotateX(-Math.PI / 2)
    return eclipticMesh
}

export const getDayOfYear = () => {
    const now = new Date(Date.now())
    const year = now.getUTCFullYear()
    const month = now.getUTCMonth()
    const day = now.getUTCDate()
    const date = new Date(year, month, day)
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}
