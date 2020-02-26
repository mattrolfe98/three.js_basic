//display the count on the home screen
let textArea = document.getElementById('info');
let counter = document.getElementById('counter');
textArea.innerText = 'Coronavirus Counter';


// Leaf materials
var leaveDarkMaterial = new THREE.MeshLambertMaterial({ color: 0xFF5733 });
var leaveLightMaterial = new THREE.MeshLambertMaterial({ color: 0xC9482D });
var stemMaterial = new THREE.MeshLambertMaterial({ color: 0x7D5A4F });
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var stemGeometry = new THREE.BoxGeometry(1, 3, 1);
var radius = 35;

// README: generate an API key here: https://wrapapi.com/api/johnfish/teamtrees/treecount/0.0.1
// it will not update without such a key
var wrapAPIKey = "whfT36N7gmfNlXQOWQQFRlghSywC38ed";
// Tracking tree count
var numTrees = 100;
var curTrees = 0;

function createShape(){
var groundMaterial = new THREE.MeshLambertMaterial({color: 0x1C5084});
var shapeGeometry = new THREE.SphereGeometry(35,100,100);
var shape = new THREE.Mesh(shapeGeometry,groundMaterial );
shape.position.set(0,0,0);
scene.add(shape);
}

function fetchTrees(){
  $.ajax({
  url: "https://wrapapi.com/use/mattrolfe98/test/coronaVirosCheck/0.0.3",
  method: "POST",
  data: {
    "wrapAPIKey": "whfT36N7gmfNlXQOWQQFRlghSywC38ed"
  }
}).done(function(data) {
  numTrees = (data["data"]["valueCheck"] * 10);
  var counterValue = numTrees * 1000;
  growTrees(numTrees);
  counter.innerText = counterValue;
});
}


function createTree(angles){
  var stem = new THREE.Mesh(stemGeometry, stemMaterial );
   stem.position.set(0, radius + 0.75, 0 );
   stem.scale.set( 0.3, 1.5, 0.3 );

   var leaveDark = new THREE.Mesh(cubeGeometry, leaveDarkMaterial );
   leaveDark.position.set( 0, radius + 3, 0 );
   leaveDark.scale.set( 1, 2, 1 );

   var leaveLight = new THREE.Mesh(cubeGeometry, leaveLightMaterial );
   leaveLight.position.set( 0, radius + 3, 0 );
   leaveLight.scale.set( 1.4, 0.5, 1.4 );

   var tree = new THREE.Group();
   tree.add( leaveDark );
   tree.add( leaveLight );
   tree.add( stem );

   tree.rotation.set(angles[0], angles[1], angles[2])

   return tree
}

// Generate a random angle triple from [0, 2PI]
function randomAngleTriple() {
  return [
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random()
  ]
}

// Add n trees to scene randomly
function growTrees(n) {
  for (var i = 0; i < n; i++) {
    scene.add(createTree(randomAngleTriple()));
  }
}

function init (){
  //set the scene and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 70;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //create lights
  var light1 = new THREE.DirectionalLight(0xDDEED3, 1);
  var light2 = new THREE.AmbientLight(0x7D7D7D);

  light1.position.set( 0,0,1);
  scene.add(light1);
  scene.add(light2);
  //scene.add(createTree());
  scene.add(createShape());
  //growTrees(200);
  fetchTrees();

  // rotation controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.update();
  var axesHelper = new THREE.AxesHelper(100);
  //scene.add(axesHelper);
}
function render(){
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
  const loader = new THREE.TextureLoader();
}

init();
render();
