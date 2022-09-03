import * as THREE from "/build/three.module.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "./jsm/controls/OrbitControls.js";

// console.log(GLTFLoader);
// console.log(OrbitControls);
let menu = document.querySelector(".dropdown");
let menubtn = document.querySelector(".burger");
let room;
let scene;
let camera;
let renderer;
let lastPosition = 0;
let model_container = document.querySelector(".webgl");
let canvasSize = document.querySelector("canvas");
const init = () => {
  scene = new THREE.Scene();

  let aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
  let d = 20;
  camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    1,
    1000
  );

  camera.position.set(10, 10, 10); // all components equal
  camera.lookAt(scene.position); // or the origin
  scene.add(camera);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: model_container,
  });
  renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  renderer.setClearColor(0x000000, 0.0);

  // const controls = new OrbitControls(camera, renderer.domElement);

  const mainLight = new THREE.SpotLight(0xffffff, 0.3, 0, 250, 0.85);
  const light = new THREE.SpotLight(0xd29292, 1.2, 0, 250, 0.5);
  const light1 = new THREE.SpotLight(0x92acd2, 1.2, 0, 250, 0.5);

  mainLight.position.set(-10, 20, 0);
  light.position.set(-17, 7, 0);
  light1.position.set(0, 7, -17);

  scene.add(light1);
  scene.add(light);
  scene.add(mainLight);

  const loader = new GLTFLoader();
  loader.load("./models/room.glb", (glb) => {
    room = glb.scene;
    room.scale.set(1.2, 1.2, 1.2);
    room.position.set(0, 0, 0);
    scene.add(glb.scene);
  });
  animate();
};

const render = () => {
  renderer.render(scene, camera);
};

let step = 0;

const animate = () => {
  requestAnimationFrame(animate);

  step += 0.02;
  room.position.y = Math.sin(step);

  render();
};

window.onload = init;

const mouseAnimation = (e) => {
  let posX = e.clientX;
  if (posX > lastPosition && room.rotation.y > -0.1) {
    room.rotation.y -= 0.01;
  } else if (posX < lastPosition && room.rotation.y < 0.1) {
    room.rotation.y += 0.01;
  }
  lastPosition = posX;
};
const activeClassToggle = () => {
  menu.classList.toggle("active");
};
window.addEventListener("mousemove", mouseAnimation);
menubtn.addEventListener("click", activeClassToggle);
