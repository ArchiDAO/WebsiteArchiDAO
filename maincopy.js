import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { PolyhedronGeometry } from 'three.js';
// Setup

//asdasdasd
//global declaration
let scene; 
let camera;
let renderer;
const canvas = document.getElementsByTagName("canvas")[0];
scene = new THREE.Scene();
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 1000;

//camera
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 8;
camera.position.x = 0;
scene.add(camera);

//default renderer
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0.0);

//bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = .5; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//sun object
const color = new THREE.Color("#ffffff");
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: color });
const box = new THREE.Mesh(geometry, material);
box.position.set(0, 0, 0);
//box.layers.set(1);
//scene.add(box);

// GLTF LOADER

const gltfloader = new GLTFLoader();

gltfloader.load('./models/pointcloud.glb',
(glb) => {
    // the request was successfull
    let ptMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.0001 })
    let glbMesh = new THREE.Points(glb.scene.children[0].geometry, ptMaterial)
    glbMesh.scale.set(0.01,0.01,0.01);
    console.log(glb);
    //glbMesh.layers.set(1);
    scene.add(glbMesh);
},
(xhr) => {
  // the request is in progress
  console.log(xhr)
},
(err) => {
  // something went wrong
  console.error("loading .glb went wrong, ", err)
})

camera.position()

//PLY LOADER
// const plyloader = new PLYLoader();
// plyloader.load('./models/untitled.ply',
// (ply) => {
//     // the request was successfull
//     ply.computeVertexNormals();
//     let ptMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 1 })
//     let plyMesh = new THREE.Points(ply.geometry, ptMaterial)
//     ply.translate(0,0,0);
//     //_mesh.scale.set(1,1,1);
//     console.log(plyMesh.name);
//     console.log(ply);
//     //plyMesh.layers.set(1);
//     scene.add(plyMesh);
// },
// (xhr) => {
//   // the request is in progress
//   console.log(xhr)
// },
// (err) => {
//   // something went wrong
//   console.error("loading .ply went wrong, ", err)
// })

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
//starMesh.layers.set(1);
scene.add(starMesh);

//ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);


//ambient light
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(0,1,0);
scene.add(pointLight);

//resize listner
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  starMesh.rotation.y += 0.001;
  box.rotation.y += 0.01;
  box.rotation.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//orbit controller
const controls = new OrbitControls(camera, renderer.domElement);

//animation loop
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  starMesh.rotation.y += 0.00005;
  box.rotation.y += 0.001;
  //camera.layers.set(1);
  bloomComposer.render();
};

animate();
