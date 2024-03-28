import * as THREE from './node_modules/three/src/Three.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = [
  new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
  new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
  new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
  new THREE.MeshBasicMaterial( { color: 0xffff00 } ),
  new THREE.MeshBasicMaterial( { color: 0xff00ff } ),
  new THREE.MeshBasicMaterial( { color: 0x00ffff } ),
];
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
}

animate();

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = [
  new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
  new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
  new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
  new THREE.MeshBasicMaterial( { color: 0xffff00 } ),
  new THREE.MeshBasicMaterial( { color: 0xff00ff } ),
  new THREE.MeshBasicMaterial( { color: 0x00ffff } ),
];
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );

cube2.position.x = 2;

function animate2() {
  requestAnimationFrame( animate2 );

  cube2.rotation.x -= 0.1;
  cube2.rotation.y -= 0.1;

  renderer.render( scene, camera );
}

animate2();

window.addEventListener('resize', function() {
  renderer.setSize(logoElement.clientWidth, logoElement.clientHeight);
  camera.aspect = logoElement.clientWidth / logoElement.clientHeight;
  camera.updateProjectionMatrix();
});


camera.position.z = 3;
camera.position.x = 1;