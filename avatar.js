import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,
  (window.innerWidth / 2) / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
const avatarDiv = document.getElementById('avatar');
renderer.setSize(avatarDiv.clientWidth, window.innerHeight);
document.getElementById('avatar').appendChild(renderer.domElement);

renderer.setClearColor(0x000000);

const textureLoader = new THREE.TextureLoader();

const controls = new OrbitControls(camera, renderer.domElement);

const headGeometry = new THREE.SphereGeometry(1, 32, 32);
const teteteTexture = textureLoader.load('avatar/male-high-res-head-texture-012-01.jpg');
teteteTexture.offset.x = 0.25; // décalage horizontal
const teteteMaterial = new THREE.MeshBasicMaterial({map: teteteTexture});

const head = new THREE.Mesh(headGeometry, teteteMaterial);
scene.add(head);

const hatGeometry = new THREE.CylinderGeometry(0.75, 1, 1.5, 32);
const hatMaterial = new THREE.MeshBasicMaterial({color: 0x8B4513});
const hat = new THREE.Mesh(hatGeometry, hatMaterial);
hat.position.y = 1.25;
scene.add(hat);

const bodyGeometry = new THREE.CylinderGeometry(0.75, 0.75, 2, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = -2;
scene.add(body);




const avatarForm = document.getElementById('avatarForm');
const hatColorInput = document.getElementById('hatColor');
const bodyColorInput = document.getElementById('bodyColor');

avatarForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const hatColor = hatColorInput.value;
  const bodyColor = bodyColorInput.value;

  hatMaterial.color.set(hatColor);
  bodyMaterial.color.set(bodyColor);
  x;
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();