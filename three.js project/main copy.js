

// Leaf materials
var leaveDarkMaterial = new THREE.MeshLambertMaterial({ color: 0x91E56E });
var leaveLightMaterial = new THREE.MeshLambertMaterial({ color: 0xA2FF7A });
var stemMaterial = new THREE.MeshLambertMaterial({ color: 0x7D5A4F });
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Generate a planet at (0,0,0) with specified radius
function planet() {
  var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x634b35});
  var planetGeometry = new THREE.SphereGeometry(35, 100, 100);
  var planet = new THREE.Mesh(planetGeometry, groundMaterial);
  planet.position.set(0,0,0);
  scene.add(planet)
}


function init() {
    // Update tree count regularly


    // Set up scene + renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Create lights, add lights to scene
    var light1 = new THREE.DirectionalLight( 0xDDEED3, 1 );
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set( 0, 0, 1 );

    scene.add(light1);
    scene.add(light2);
    scene.add(planet());

    // Orbital controls (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();
    var axesHelper = new THREE.AxesHelper( 100 );
    scene.add( axesHelper );
}

function render() {
    requestAnimationFrame( render );
    controls.update();
    renderer.render( scene, camera );
}

init();
render();
