import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui'

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

window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const group = new THREE.Group();

scene.add(group);

const gui = new GUI({
  closeFolders: true,
});
const cubeTweaks = gui.addFolder('Awesome cube')
const debugObject = {}
debugObject.color = '#3a6ea6';
debugObject.spin = () =>
{
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
debugObject.subdivision = 2



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100)

camera.position.z = 2
camera.position.y = .5
camera.position.x = .3
scene.add(camera)


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const doorColorTexture = textureLoader.load('./materials/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./materials/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./materials/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./materials/door/height.jpg')
const doorNormalTexture = textureLoader.load('./materials/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./materials/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./materials/door/roughness.jpg')
// const matcapTexture = textureLoader.load('./materials/matcaps/1.png')
// const matcapTexture = textureLoader.load('./materials/matcaps/2.png')
const matcapTexture = textureLoader.load('./materials/matcaps/3.png')
// const matcapTexture = textureLoader.load('./materials/matcaps/4.png')
// const matcapTexture = textureLoader.load('./materials/matcaps/5.png')
// const matcapTexture = textureLoader.load('./materials/matcaps/6.png')
const gradientTexture = textureLoader.load('./materials/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace


// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
// material.color = new THREE.Color('#ff0000')
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('0x1188ff')

const material = new THREE.MeshToonMaterial()
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture
gradientTexture.generateMipmaps = false

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

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


const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick);
}



tick();
