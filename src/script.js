import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  // const textMaterial = new THREE.MeshBasicMaterial();
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
  textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02),
  //   -(textGeometry.boundingBox.max.z - 0.03)* 0.5
  // );
  textGeometry.center()
});

window.addEventListener("mousemove", (event) => {
  // console.log('event', event)
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = (event.clientY / sizes.height - 0.5) * -1;
  // console.log('cursor.y', cursor.y)
});

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", (event) => {
  const fullScreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullScreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

scene.add(group);

const gui = new GUI({
  closeFolders: true,
});
const debugObject = {};
debugObject.color = "#3a6ea6";
debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};
debugObject.subdivision = 2;

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load("./materials/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./materials/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./materials/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./materials/door/height.jpg");
const doorNormalTexture = textureLoader.load("./materials/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./materials/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./materials/door/roughness.jpg"
);

const matcapTexture = textureLoader.load("./materials/matcaps/3.png");
const gradientTexture = textureLoader.load("./materials/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshPhysicalMaterial();

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 64, 64),
//     material
// )
// sphere.position.x = - 1.5

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1, 100, 100),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3, 0.2, 64, 128),
//     material
// )
// torus.position.x = 1.5

// scene.add(sphere, plane, torus)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let time = Date.now();

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime
  // plane.rotation.y = 0.1 * elapsedTime
  // torus.rotation.y = 0.1 * elapsedTime

  // sphere.rotation.x = 0.15 * elapsedTime
  // plane.rotation.x = 0.15 * elapsedTime
  // torus.rotation.x = 0.15 * elapsedTime
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
