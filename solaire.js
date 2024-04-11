import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

function createSolar() {
    // Créer le groupe pour le système solaire
    const solarSystem = new THREE.Group();

    const textureLoader = new THREE.TextureLoader();

    // Charger les textures
    const sunTexture = textureLoader.load('assets/sun.jpg');
    const earthTexture = textureLoader.load('assets/earthmab.jpg');
    const moonTexture = textureLoader.load('assets/moonb.jpg');

    // Créer le soleil
    const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture, emissive: 0xFFDD99, emissiveIntensity: 0.75 });
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);
    // Créer la lumière ponctuelle pour le soleil
    const sunLight = new THREE.PointLight(0xFFFFFF, 100, 0);
    sun.add(sunLight);

    // Créer le groupe pour le système Terre-Lune
    const earthMoonSystem = new THREE.Group();
    solarSystem.add(earthMoonSystem);
    earthMoonSystem.position.x = 6;

    // Créer la terre
    const earthMaterial = new THREE.MeshPhongMaterial({map: earthTexture, shininess: 10, specular: 0x888888 });
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMoonSystem.add(earth);

    // Créer la lune
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture});
    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    earthMoonSystem.add(moon);
    moon.position.x = 1.6;

    // Créer une lumière ponctuelle pour la lune
    const moonLight = new THREE.PointLight(0xFFFFFF, 0.5, 0);
    moon.add(moonLight);

    // Ajouter une faible lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    solarSystem.add(ambientLight);

    // Créer une boucle de rendu
    solarSystem.setTime = function(time){
        earthMoonSystem.rotation.y = time/28;
        earth.rotation.y = time;
        solarSystem.rotation.y = time/365;
    }


    return solarSystem;
}

// Créer une scène
const scene = new THREE.Scene();

// Ajouter le système solaire à la scène
const solarSystem = createSolar();
scene.add(solarSystem);

// Créer un renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// background black
renderer.setClearColor(0x000000);
window.addEventListener('resize', function() {
    // Mettre à jour les dimensions du rendu
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Mettre à jour les aspects de la caméra
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


// Créer des contrôles pour la caméra
const camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 10;

// Charger la texture du ciel étoilé
const starTexture = new THREE.TextureLoader().load('assets/Solarsystemscope_texture_8k_stars_milky_way.jpg');

// Créer le matériau pour le ciel étoilé
const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide // Vue de l'intérieur
});

// Créer la géométrie pour le ciel étoilé
const starGeometry = new THREE.SphereGeometry(1000, 32, 32);

// Créer le mesh pour le ciel étoilé
const starMesh = new THREE.Mesh(starGeometry, starMaterial);

// Ajouter le ciel étoilé à la scène
scene.add(starMesh);

// Augmenter la distance de clipping de la caméra
camera.far = 2000; // Deux fois le rayon de la sphère
camera.updateProjectionMatrix(); // Mettre à jour la matrice de projection de la caméra

function animate() {
    requestAnimationFrame(animate);
    let chrono = Date.now() * 0.1;
    solarSystem.setTime(chrono/40);
    controls.update();
    renderer.render(scene, camera);
}


animate();