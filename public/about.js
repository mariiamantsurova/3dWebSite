import * as THREE from "/build/three.module.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";
let hand;
let scene;
let camera;
let renderer;
let menu = document.querySelector(".dropdown");
let menubtn = document.querySelector(".burger");
let model_container = document.querySelector(".webgl");
let canvasSize = document.querySelector("canvas");
let mixer;
const clock = new THREE.Clock();
const init = () => {
  scene = new THREE.Scene();

  let aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);

  camera.position.set(0, 10, 30); // all components equal
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

  const mainLight = new THREE.SpotLight(0xffffff, 1, 0, 250, 1);
  mainLight.position.set(-15, 20, 30);
  const light2 = new THREE.SpotLight(0x769eda, 2, 0, 250, 0.85);
  light2.position.set(15, 20, -30);
  const light3 = new THREE.SpotLight(0xf2d3d3, 0.5, 0, 250, 5);
  light3.position.set(15, 0, 10);
  scene.add(mainLight);
  scene.add(light2);
  scene.add(light3);
  const loader = new GLTFLoader();
  loader.load("./models/hand.glb", (glb) => {
    hand = glb.scene;
    hand.scale.set(6, 6, 6);
    hand.position.set(0, -5, 0);
    scene.add(hand);
    mixer = new THREE.AnimationMixer(hand);

    const clips = glb.animations;
    const clip = THREE.AnimationClip.findByName(clips, "handShake");
    const action = mixer.clipAction(clip);
    action.play();
  });
  animate();
};

const render = () => {
  renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(animate);
  mixer.update(clock.getDelta());
  render();
};

window.onload = init;

const activeClassToggle = () => {
  menu.classList.toggle("active");
};
menubtn.addEventListener("click", activeClassToggle);
