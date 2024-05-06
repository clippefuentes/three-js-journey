import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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
  height: window.innerHeight
}

window.addEventListener('mousemove', (event) => {
  // console.log('event', event)
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = (event.clientY / sizes.height - 0.5) * -1;
  // console.log('cursor.y', cursor.y)
});

window.addEventListener('resize', (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', (event) => {
  const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;

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

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const group = new THREE.Group();

scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000  })
// );

// group.add(cube1);

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00   })
// );

// cube2.position.x = -2;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x0000ff   })
// );

// cube3.position.x = 2;
// group.add(cube3);


// group.position.y = 1
// group.position.z = -1

const positionArray = new Float32Array([
  0, 0, 0,
  0, 1, 0,
  1, 0, 0,
]);
const positionAttributres = new THREE.BufferAttribute(positionArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionAttributres);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

// const geometry = new THREE.BufferGeometry();
// const count = 50;
// const positionArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionArray[i] = (Math.random() - 0.5) * 4;
// }

// const positionAttributres = new THREE.BufferAttribute(positionArray, 3)
geometry.setAttribute('position', positionAttributres);
const material = new THREE.MeshBasicMaterial({ 
  color: 0xff0000,
  wireframe: true
});
const cube = new THREE.Mesh(
  geometry, material
)
  

group.add(cube);


/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// mesh.position.set(-1.1, 1, -1.5)
// mesh.scale.set(1.2, 2.0, 3);
// mesh.rotation.set(0, 0, 0);
// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100)
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -3 * aspectRatio,
//   3 * aspectRatio, 
//   3, 
//   -3,
//   0.1,
//   100
// );
camera.position.z = 5
camera.position.y = 1
camera.position.x = .5
console.log('Camera aposition', camera.position.length())
scene.add(camera)

// camera.lookAt(new THREE.Vector3(1, 1, 1));

// camera.lookAt(mesh.position);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let time = Date.now();

// const tick = () => {
//   console.log('tick');
//   // cube1.position.x += 0.001
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;
//   cube1.rotation.y += .001 * deltaTime;

//   renderer.render(scene, camera)
//   window.requestAnimationFrame(tick);
//   console.log('Delta ', deltaTime)
// }

const clock = new THREE.Clock();

const tick = () => {
  const currentTime = clock.getElapsedTime();
  // cube1.rotation.y = currentTime * Math.PI;
  // cube1.position.y = Math.sin(currentTime);
  // cube1.position.x = Math.cos(currentTime);
  // camera.lookAt(cube1.position)
  // update mcaera
  // const positionX = Math.sin(cursor.x * Math.PI * 2) * 3;
  // const positionZ = Math.cos(cursor.x * Math.PI * 2) * 3;
  // const positionY = cursor.y * 3;
  // camera.position.set(
  //   positionX, 
  //   positionY, 
  //   positionZ
  // )
  // camera.lookAt(
  //   // new THREE.Vector3()
  //   cube1.position
  // )
  
  // Update controls
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick);
}


// gsap.to(cube1.position, { x: 3, duration: 1, delay: 1 });
// gsap.to(cube1.position, { x: 0, duration: 1, delay: 2.5 });

// const tick = () => {
//   renderer.render(scene, camera)
//   window.requestAnimationFrame(tick);
// }

tick();
