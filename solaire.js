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
  const teteteTexture = textureLoader.load('assets/IMG_8870.jpg');

  // Créer le soleil
  const sunMaterial = new THREE.MeshBasicMaterial(
    {map: sunTexture, emissive: 0xFFDD99, emissiveIntensity: 0.75});
  const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  solarSystem.add(sun);
  // Créer la lumière ponctuelle pour le soleil
  const sunLight = new THREE.PointLight(0xFFFFFF, 50, 0);
  sun.add(sunLight);

  // Créer le groupe pour le système Terre-Lune
  const earthMoonSystem = new THREE.Group();
  solarSystem.add(earthMoonSystem);

  // Créer la terre
  const earthMaterial = new THREE.MeshPhongMaterial(
    {map: earthTexture, shininess: 10, specular: 0x888888});
  const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earthMoonSystem.add(earth);

  // Créer la lune
  const moonMaterial = new THREE.MeshPhongMaterial({map: moonTexture});
  const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  earthMoonSystem.add(moon);
  moon.position.x = 1;

  const mercuryMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const venusMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const marsMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const jupiterMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const saturnMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const uranusMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const neptuneMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});
  const plutoMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});

  const mercuryGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const venusGeometry = new THREE.SphereGeometry(0.4, 32, 32);
  const marsGeometry = new THREE.SphereGeometry(0.3, 32, 32);
  const jupiterGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const saturnGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const uranusGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const neptuneGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const plutoGeometry = new THREE.SphereGeometry(0.1, 32, 32);

  const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
  const venus = new THREE.Mesh(venusGeometry, venusMaterial);
  const mars = new THREE.Mesh(marsGeometry, marsMaterial);
  const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
  const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
  const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
  const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
  const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);

// Créer un groupe pour chaque planète
  const mercuryGroup = new THREE.Group();
  const venusGroup = new THREE.Group();
  const earthGroup = new THREE.Group();
  const marsGroup = new THREE.Group();
  const jupiterGroup = new THREE.Group();
  const saturnGroup = new THREE.Group();
  const uranusGroup = new THREE.Group();
  const neptuneGroup = new THREE.Group();
  const plutoGroup = new THREE.Group();

// Ajouter chaque planète à son groupe
  mercuryGroup.add(mercury);
  venusGroup.add(venus);
  earthGroup.add(earthMoonSystem); // Pour la Terre, nous utilisons le groupe Terre-Lune existant
  marsGroup.add(mars);
  jupiterGroup.add(jupiter);
  saturnGroup.add(saturn);
  uranusGroup.add(uranus);
  neptuneGroup.add(neptune);
  plutoGroup.add(pluto);

// Créer le matériau pour les orbites
  const orbitMaterial = new THREE.LineBasicMaterial({color: 0x636363});

// Créer une orbite pour chaque planète
  const mercuryOrbit = createOrbit(2, orbitMaterial);
  const venusOrbit = createOrbit(4, orbitMaterial);
  const earthOrbit = createOrbit(6, orbitMaterial);
  const marsOrbit = createOrbit(8, orbitMaterial);
  const jupiterOrbit = createOrbit(12, orbitMaterial);
  const saturnOrbit = createOrbit(16, orbitMaterial);
  const uranusOrbit = createOrbit(20, orbitMaterial);
  const neptuneOrbit = createOrbit(24, orbitMaterial);
  const plutoOrbit = createOrbit(28, orbitMaterial);

// Ajouter chaque groupe au système solaire
  solarSystem.add(mercuryGroup);
  solarSystem.add(venusGroup);
  solarSystem.add(earthGroup);
  solarSystem.add(marsGroup);
  solarSystem.add(jupiterGroup);
  solarSystem.add(saturnGroup);
  solarSystem.add(uranusGroup);
  solarSystem.add(neptuneGroup);
  solarSystem.add(plutoGroup);
  // Ajouter chaque orbite au système solaire
  solarSystem.add(mercuryOrbit);
  solarSystem.add(venusOrbit);
  solarSystem.add(earthOrbit);
  solarSystem.add(marsOrbit);
  solarSystem.add(jupiterOrbit);
  solarSystem.add(saturnOrbit);
  solarSystem.add(uranusOrbit);
  solarSystem.add(neptuneOrbit);
  solarSystem.add(plutoOrbit);

  mercury.position.x = 2; // Position de Mercure
  venus.position.x = 4; // Position de Venus
  earthMoonSystem.position.x = 6; // Position de la Terre
  mars.position.x = 8; // Position de Mars
  jupiter.position.x = 12; // Position de Jupiter
  saturn.position.x = 16; // Position de Saturne
  uranus.position.x = 20; // Position d'Uranus
  neptune.position.x = 24; // Position de Neptune
  pluto.position.x = 28; // Position de Pluton

  let timeMercury = 0;
  let timeVenus = 0;
  let timeEarth = 0;
  let timeMars = 0;
  let timeJupiter = 0;
  let timeSaturn = 0;
  let timeUranus = 0;
  let timeNeptune = 0;
  let timePluto = 0;
  let timeMoon = 0;

  sun.castShadow = true;
  earth.castShadow = true;
  moon.castShadow = true;
  mercury.castShadow = true;
  venus.castShadow = true;
  mars.castShadow = true;
  jupiter.castShadow = true;
  saturn.castShadow = true;
  uranus.castShadow = true;
  neptune.castShadow = true;
  pluto.castShadow = true;

  earth.receiveShadow = true;
  moon.receiveShadow = true;
  mercury.receiveShadow = true;
  venus.receiveShadow = true;
  mars.receiveShadow = true;
  jupiter.receiveShadow = true;
  saturn.receiveShadow = true;
  uranus.receiveShadow = true;
  neptune.receiveShadow = true;
  pluto.receiveShadow = true;

  solarSystem.setTime = function(time) {
    timeMercury += time / 88; // Mercury takes about 88 Earth days to orbit the Sun
    timeVenus += time / 225; // Venus takes about 225 Earth days to orbit the Sun
    timeEarth += time / 365; // Earth takes about 365 Earth days to orbit the Sun
    timeMars += time / 687; // Mars takes about 687 Earth days to orbit the Sun
    timeJupiter += time / 4332; // Jupiter takes about 4332 Earth days (about 11.86 Earth years) to orbit the Sun
    timeSaturn += time / 10759; // Saturn takes about 10759 Earth days (about 29.46 Earth years) to orbit the Sun
    timeUranus += time / 30688; // Uranus takes about 30688 Earth days (about 84 Earth years) to orbit the Sun
    timeNeptune += time / 60182; // Neptune takes about 60182 Earth days (about 165 Earth years) to orbit the Sun
    timePluto += time / 90560; // Pluto takes about 90560 Earth days (about 248 Earth years) to orbit the Sun
    timeMoon += time / 27.3; // La lune prend environ 27.3 jours terrestres pour orbiter autour de la Terre
    mercury.rotation.y += 0.01;
    venus.rotation.y += 0.01;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.01;
    jupiter.rotation.y += 0.01;
    saturn.rotation.y += 0.01;
    uranus.rotation.y += 0.01;
    neptune.rotation.y += 0.01;
    pluto.rotation.y += 0.01;
    moon.position.x = Math.sin(timeMoon) * 1.5; // 1.5 est la distance entre la Terre et la Lune
    moon.position.z = Math.cos(timeMoon) * 1.5;

    mercuryGroup.rotation.y = timeMercury;
    venusGroup.rotation.y = timeVenus;
    earthGroup.rotation.y = timeEarth;
    marsGroup.rotation.y = timeMars;
    jupiterGroup.rotation.y = timeJupiter;
    saturnGroup.rotation.y = timeSaturn;
    uranusGroup.rotation.y = timeUranus;
    neptuneGroup.rotation.y = timeNeptune;
    plutoGroup.rotation.y = timePluto;
  };

  function createOrbit(radius, material) {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const segment = (i / 100) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(segment) * radius, // x
        0, // y (set to 0 if orbits are flat)
        Math.sin(segment) * radius, // z
      ));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
  }

  // Créer une lumière ponctuelle pour la lune
  const moonLight = new THREE.PointLight(0xFFFFFF, 0.1, 0);
  moon.add(moonLight);

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

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;

window.addEventListener('resize', function() {
  // Update the dimensions of the renderer
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Update the aspects of the camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Créer des contrôles pour la caméra
const camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 10;

// Charger la texture du ciel étoilé
const starTexture = new THREE.TextureLoader().load(
  'assets/Solarsystemscope_texture_8k_stars_milky_way.jpg');

// Créer le matériau pour le ciel étoilé
const starMaterial = new THREE.MeshBasicMaterial({
  map: starTexture, side: THREE.BackSide, // Vue de l'intérieur
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

// Récupérez l'élément slider
const timeSlider = document.getElementById('timeSlider');

// Ajoutez un gestionnaire d'événements pour le changement de valeur du slider
timeSlider.addEventListener('input', function() {
  // Mettez à jour le temps du système solaire en fonction de la valeur du slider
  solarSystem.setTime(timeSlider.value);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();