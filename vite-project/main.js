import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; //import orbit

// 3 objects are necessary: 
// 1. Scene- a scene is a container
const scene = new THREE.Scene();

// 2. Camera- perspective camera, mimics the human eye
// THREE.PerspectiveCamera(FOV, Aspect Ratio, frustrum min, frustrum max)
      //aspect ratio divides the user's width from height 
      //view frustrum decides which objects are visible to the user at which point  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
      //select dom element
});
    //instantiate renderer object

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight ); //make canvas fullscreen
camera.position.setZ(30); //move canvas along z axis. I HAD IT WRITTEN AS set2 lmao 


renderer.render( scene, camera); //call render method passing in scene and camera


//geometry set of vectors( xyz ) defining shape 
  //threejs has documentation defining different shapes
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//apply material to geometry
  //mesh basic material does not require a light source
// const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true});
  //mesh standard material allows lighting 
  //initially the view will be black because there's no lighting
const material = new THREE.MeshStandardMaterial({ color: 0xff00a2 });

//create mesh, which is the actual final thing we want to add to the scene
const torus = new THREE.Mesh( geometry, material );

//add the model defined as torus to scene
scene.add(torus);

//acts as a lightbult, emitting light in all directions
const pointLight = new THREE.PointLight(0x004cff);
pointLight.position.set(5, 5, 5); //puts light inside of torus at first


const ambientLight = new THREE.AmbientLight(0xfdffa1); //puts light over entire project
scene.add(pointLight, ambientLight); //add all objects to screen

//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight) //shows position of pointlight, adds tiny wireframe where light is
const gridHelper = new THREE.GridHelper(200, 50); //adds grid maybe
scene.add(lightHelper, gridHelper);

//orbit control instantiation, allows moving of the camera using the mouse
const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){ //generate random stars
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );

  //generate random x y z coordinates
  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar) //creates 200 stars 

const spaceTexture = new THREE.TextureLoader().load('nebula.jpg'); //load background image
scene.background = spaceTexture //set scene's background image

//call the renderer to re render the scene
//instead of calling the renderer every time a change happens, use a recursive function like this to do it automatically
function animate(){ //sort of like a game loop
  requestAnimationFrame(animate);
  //update the rotation property of torus by .01 each frame to create an animation
  torus.rotation.z += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  //higher numbers are faster
  controls.update(); //updates changes to the orbitcontrols
  renderer.render( scene, camera );
}

//call animate function
animate()