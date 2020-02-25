const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 80;

var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
//Create a SpotLight and turn on shadows for the light
var light = new THREE.SpotLight( 0xffffff );
light.castShadow = true;            // default false
scene.add( light );
//Set up shadow properties for the light
light.shadow.mapSize.width = 5;  // default
light.shadow.mapSize.height = 100; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 500      // default

//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
//create the shape
const geometry = new THREE.SphereGeometry( 5, 100, 100 );
//paint the shape
const material = new THREE.MeshBasicMaterial ({color : 0x634b35});
//put the shape together
const sphere = new THREE.Mesh(geometry, material);
sphere.receiveShadow = true;
sphere.position.set(0,0,0);
scene.add(sphere);

//Create a plane that receives shadows (but does not cast them)
var planeGeometry = new THREE.SphereBufferGeometry( 5, 100, 100 );
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.position.set(0,0,0.2);
scene.add( plane );




var controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.autoRotate = true;
controls.update();

//-------- run animation -----------
var animate = function () {
				requestAnimationFrame( animate );

				sphere.rotation.x += 0.01;
				sphere.rotation.y += 0.01;

				renderer.render( scene, camera );
			};
animate();
