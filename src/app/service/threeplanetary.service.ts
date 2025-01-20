import { Injectable } from '@angular/core';
import * as THREE from 'three';
// import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Injectable({
    providedIn: 'root'
})
export class ThreePlanetaryService {
    createScene(): void {
        const canvasParent = document.getElementById("canvas");
        if (canvasParent) {
            // Setting up a scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xdcdcf8);
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            const light = new THREE.AmbientLight(0xffffff);
            scene.add(light);
            renderer.setSize(window.innerWidth, window.innerHeight);
            canvasParent.appendChild(renderer.domElement);

            camera.position.set(1, 1, 10);

            // const controls = new OrbitControls(camera, renderer.domElement);
            // const controls = new ArcballControls(camera, renderer.domElement, scene);
            const controls = new TrackballControls(camera, renderer.domElement);

            const loader = new GLTFLoader();

            let earth: any

            loader.load('./earth.glb', function (gltf) {
                earth = gltf.scene
                scene.add(earth)

            }, undefined, function (error) {
                console.error(error);
            });

            var earthAxis = new THREE.Vector3(0, 1, 0).normalize()
            let speed = 0.05

            // controls.update();


            function animate() {
                // rotate da cube
                // cube.rotation.x += 0.01;
                // cube.rotation.y += 0.01;
                if (earth) {
                    earth.rotateOnWorldAxis(earthAxis, speed)
                }

                controls.update();

                renderer.render(scene, camera);
            }

            renderer.setAnimationLoop(animate);
        }

    }
}
