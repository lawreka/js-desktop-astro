import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Injectable({
    providedIn: 'root'
})
export class ThreePlanetaryService {
    createScene(): void {
        const canvasParent = document.getElementById("canvas");
        if (canvasParent) {
            const width = window.innerWidth
            const height = window.innerHeight
            const loader = new THREE.TextureLoader();
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xAAAAAA);
            // const stars = loader.load(`./stars.jpg`);
            // scene.background = stars
            const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 5000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            canvasParent.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);

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



            let earthXPos: any
            let sunlight: any
            const earthGroup = new THREE.Group()

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

            const moonGroup = new THREE.Group()


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

            const sunGroup = new THREE.Group()

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

            createPlanets()


            const earthPosition = new THREE.Vector3(earthXPos, 0, 0)

            camera.position.set(0, 0, 1000)
            controls.update();

            const clock = new THREE.Clock();

            function animate() {

                controls.update()
                camera.lookAt(earthPosition)

                const delta = clock.getDelta();

                earthGroup.rotation.y += delta * 0.025
                moonGroup.position.y += 0.01

                const t = clock.getElapsedTime()
                const moonAngle = t * 0.2
                moonGroup.position.set(
                    2 * Math.cos(moonAngle) + earthGroup.position.x,
                    2 * Math.sin(moonAngle) + earthGroup.position.y,
                    0
                )

                renderer.render(scene, camera);
            }

            renderer.setAnimationLoop(animate);

            function handleWindowResize() {
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.render(scene, camera);
            }
            window.addEventListener('resize', handleWindowResize, false);
        }

    }
}
