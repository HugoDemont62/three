import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

function createSolar() {
    // Créer le groupe pour le système solaire
    const solarSystem = new THREE.Group();

    // Créer le soleil
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFDD99, emissive: 0xFFDD99, emissiveIntensity: 0.75 });
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);

    // Créer le groupe pour le système Terre-Lune
    const earthMoonSystem = new THREE.Group();
    solarSystem.add(earthMoonSystem);
    earthMoonSystem.position.x = 6;

    // Créer la terre
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x5588DD, shininess: 10, specular: 0x888888 });
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMoonSystem.add(earth);

    // Créer la lune
    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x777777 });
    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    earthMoonSystem.add(moon);
    moon.position.x = 1.6;

    // Ajouter une lumière ponctuelle à l'origine
    const pointLight = new THREE.PointLight(0xFFFFFF, 1, 0);
    pointLight.position.set(0, 0, 0);
    solarSystem.add(pointLight);

    // Ajouter une faible lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    solarSystem.add(ambientLight);

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

// Créer une boucle de rendu
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();