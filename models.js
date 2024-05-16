import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { TextureLoader } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const scene = new THREE.Scene()
scene.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

const light = new THREE.PointLight(0xffffff, 250, 10);
light.position.set(0, 5, -5);
scene.add(light);

const gui = new dat.GUI();
const textureLoader = new TextureLoader();
const exporter = new GLTFExporter();

function exportGLTF() {
  exporter.parse(scene, function(gltf) {
    const blob = new Blob([JSON.stringify(gltf)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'model.gltf';
    link.click();
  });
}

const exportButton = document.createElement('button');
exportButton.textContent = 'Export GLTF';
exportButton.addEventListener('click', exportGLTF);
document.body.appendChild(exportButton);

const loader = new GLTFLoader();
loader.load('/models/unicorn.glb', function(gltf) {
  gltf.scene.traverse(function(node) {
    if (node.isMesh) {
      const folder = gui.addFolder(node.name);
      folder.add(node.material, 'visible').name('Visible');

      folder.addColor(new THREE.Color(node.material.color.getHex()), 'r').onChange(function(value) {
        node.material.color.set(value);
      });

      folder.add({ texture: '' }, 'texture').onChange(function(value) {
        textureLoader.load(value, function(texture) {
          node.material.map = texture;
          node.material.needsUpdate = true;
        });
      });

      folder.open();
    }
  });
  scene.add(gltf.scene);
}, undefined, function(error) {
  console.error(error);
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();