function createShape(){
var groundMaterial = new THREE.MeshLambertMaterial({color: 0x634b35});
var shapeGeometry = new THREE.SphereGeometry(35,100,100);
var shape = new THREE.Mesh(shapeGeometry,groundMaterial );
shape.position.set(0,0,0);
scene.add(shape);
}

function init (){
  //set the scene and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //create lights
  var light1 = new THREE.DirectionalLight(0xDDEED3, 1);
  var light2 = new THREE.AmbientLight(0x7D7D7D);

  light1.position.set( 0,0,1);
  scene.add(light1);
  scene.add(light2);
  scene.add(createShape());
  // rotation controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.update();
  var axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

}

function render(){
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

init();
render();
