import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

// Setup

let gltfFile = './models/pointcloud.glb'
var modelScaleFactor = 1;

//global declaration
let scene; 

let camera;

let renderer;

const canvas = document.getElementsByTagName("canvas")[0];

scene = new THREE.Scene();

//camera
const fov = 60;

const aspect = window.innerWidth / window.innerHeight;

const near = 0.01;

const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 5;

camera.position.x = 0;

scene.add( camera );

//default renderer
renderer = new THREE.WebGLRenderer({

  canvas: canvas,
  antialias: true,

});
renderer.autoClear = false;

renderer.setSize( window.innerWidth, window.innerHeight );

renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

renderer.setClearColor(0x000000, 0.0);

//bloom renderer
const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass (

  new THREE.Vector2 ( window.innerWidth , window.innerHeight ),

  1.5,
  0.4,
  0.85

  );

  bloomPass.threshold = 0;

  bloomPass.strength = .5; //intensity of glow

  bloomPass.radius = 0;

  const bloomComposer = new EffectComposer(renderer);

  bloomComposer.setSize ( window.innerWidth, window.innerHeight );

  bloomComposer.renderToScreen = true;

  bloomComposer.addPass(renderScene);

  bloomComposer.addPass(bloomPass);


// GLTF pointcloud LOADER
var glbMesh = new THREE.Points();

const gltfloader = new GLTFLoader();

gltfloader.load( gltfFile,
(glb) => {
    // the request was successfull
    let ptMaterial = new THREE.PointsMaterial({ 

      color: 0xFFFFFF,
      size: 0.0001,
      
     })

    glbMesh = new THREE.Points( glb.scene.children[0].geometry, ptMaterial );

    glbMesh.scale.set( 1 * modelScaleFactor ,1 * modelScaleFactor , 1 * modelScaleFactor );

    console.log(glb);

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

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({

  map: THREE.ImageUtils.loadTexture("galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,

});

// galaxy mesh
const starMesh = new THREE.Mesh( starGeometry, starMaterial );
//starMesh.layers.set(1);
scene.add( starMesh );

//ambient light
const ambientlight = new THREE.AmbientLight( 0xffffff, 0.1 );

scene.add(ambientlight);


//point light
const pointLight = new THREE.PointLight( 0xffffff, 0.1 );

pointLight.position.set( 0 , 0 , 1 );

scene.add(pointLight);

//resize listner
window.addEventListener(
  "resize",
  () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight );
    bloomComposer.setSize( window.innerWidth, window.innerHeight );
  },
  false
);

// animate on scroll
function animateOnScroll() {

  const t = document.body.getBoundingClientRect().top;
  starMesh.rotation.y += 0.001;
  glbMesh.rotation.y += 0.1;

}

document.body.onscroll = animateOnScroll;
animateOnScroll();

//orbit controller
const controls = new OrbitControls ( camera, renderer.domElement );

//animation loop
const animate = () => {

  requestAnimationFrame(animate);
  controls.update();
  bloomComposer.render();

};

animate();
