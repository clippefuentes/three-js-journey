import * as THREE from 'three'
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000  })
);

group.add(cube1);

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
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
camera.position.y = 1
camera.position.x = .5

scene.add(camera)

// camera.lookAt(new THREE.Vector3(1, 1, 1));

// camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

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

// const tick = () => {
//   console.log('tick');
//   // cube1.position.x += 0.001
//   const currentTime = clock.getElapsedTime();
//   console.log('currentTime', currentTime);
//   // const deltaTime = currentTime - time;
//   // time = currentTime;
//   cube1.rotation.y = currentTime * Math.PI;
//   cube1.position.y = Math.sin(currentTime);
//   cube1.position.x = Math.cos(currentTime);
//   camera.lookAt(cube1.position)

//   renderer.render(scene, camera)
//   window.requestAnimationFrame(tick);
// }


gsap.to(cube1.position, { x: 3, duration: 1, delay: 1 });
gsap.to(cube1.position, { x: 0, duration: 1, delay: 2.5 });

const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick);
}

tick();
