import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSun, createEarth, createEarthOrbit, createMoon, createClouds } from './planets';

@Injectable({
    providedIn: 'root'
})
export class ThreePlanetaryService {
    createScene(): void {
        const canvasParent = document.getElementById("canvas");
        if (canvasParent) {
            const WIDTH = window.innerWidth
            const HEIGHT = window.innerHeight
            const VIEW_ANGLE = 30, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 10000;
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xAAAAAA);
            // const stars = loader.load(`./stars.jpg`);
            // scene.background = stars
            const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true
            canvasParent.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 5, 10)
            controls.update();

            const sunlight = new THREE.PointLight(0xffffff, 2, 0, 0)
            sunlight.position.set(0, 0, 0)
            scene.add(sunlight)

            const sun = createSun()
            sun.position.set(0, 0, 0)
            scene.add(sun)

            const { earthGroup, earth, moon, clouds } = createEarth()
            earthGroup.position.set(3, 0, 0)
            scene.add(earthGroup)

            const { earthOrbitCurve, earthOrbitLine } = createEarthOrbit()
            scene.add(earthOrbitLine)

            const loopTime = 1 // 1 year for each orbit around the sun
            const earthOrbitSpeed = 0.00001
            const moonOrbitRadius = 0.25
            const moonOrbitSpeed = 50

            function animate() {

                controls.update()

                const time = earthOrbitSpeed * performance.now() // time in ms * value to slow orbit
                const t = (time % loopTime) / loopTime // ranges from 0 - 1
                let p = earthOrbitCurve.getPoint(t) // at a given time, where am I on the curve? returns a vector

                earthGroup.position.x = p.x // set x position of earth at point on curve
                earthGroup.position.z = p.y // set y position of earth at point on curve

                // move moon around earth, orbiting around earth group position
                moon.position.x = -Math.cos(time * moonOrbitSpeed) * moonOrbitRadius
                moon.position.z = -Math.sin(time * moonOrbitSpeed) * moonOrbitRadius

                // rotate all bodies on axis
                sun.rotation.y += 0.001
                earth.rotation.y += 0.01
                clouds.rotation.y += 0.015
                moon.rotation.y += 0.01

                renderer.render(scene, camera);
            }

            renderer.setAnimationLoop(animate);

            function handleWindowResize() {
                renderer.setSize(window.innerWidth, window.innerHeight);
                const canvasParent = document.getElementById("canvas");
                if (canvasParent) {
                    canvasParent.appendChild(renderer.domElement);
                }

                renderer.render(scene, camera);
            }
            window.addEventListener('resize', handleWindowResize, false);
        }

    }
}
