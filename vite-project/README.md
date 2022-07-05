# 3dtut
commands to run on terminal 
npm init @vitejs/app -vanillajs 
npm install three 
npm run dev -serves app locally 

delete style.css and main.js files delete boilerplate
add <canvas></canvas> to body in index.html

add: 
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
to style.css

add: import * as THREE from 'three'; to main.js 

3 objects are necessary: 
1. Scene
2. Camera
3. renderer

add: const scene = new THREE.Scene(); to main.js

make sure that the style.css file has main's position as absolute or the text won't appear on the screen