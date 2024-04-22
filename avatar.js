import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.getElementById('avatar').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const headGeometry = new THREE.SphereGeometry(1, 32, 32);
const headMaterial = new THREE.MeshBasicMaterial({color: 0xFFD700});
const head = new THREE.Mesh(headGeometry, headMaterial);
scene.add(head);

const hatGeometry = new THREE.CylinderGeometry(0.75, 1, 1.5, 32);
const hatMaterial = new THREE.MeshBasicMaterial({color: 0x8B4513});
const hat = new THREE.Mesh(hatGeometry, hatMaterial);
hat.position.y = 1.25;
scene.add(hat);

const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const eyeMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.3, 0, 0.9);
head.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.3, 0, 0.9);
head.add(rightEye);

const mouthGeometry = new THREE.RingGeometry(0.2, 0.3, 32);
const mouthMaterial = new THREE.MeshBasicMaterial(
  {color: 0xFF0000, side: THREE.DoubleSide});
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(0, -0.5, 0.9);
mouth.rotation.x = Math.PI;
head.add(mouth);

const bodyGeometry = new THREE.CylinderGeometry(0.75, 0.75, 2, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = -2;
scene.add(body);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();