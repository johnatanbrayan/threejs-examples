var scene, camera, renderer, cube;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var geometry = new THREE.BoxGeometry(1.2, 1.7, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x93CCEA });

  cube = new THREE.Mesh(geometry, material);

  cube.material.transparent = true;

  scene.add(cube);

  camera.position.z = 4.6;
  // camera.position.y = 0.66;

  createjs.Ticker.timingMode = createjs.Ticker.RAF; 
  createjs.Ticker.addEventListener("tick", animate);

  cube.material.opacity = 0;

  createjs.Tween.get(cube.material, { loop: true }).to({ opacity: 1 }, 500).wait(1500).to({ opacity: 0}, 500);
  createjs.Tween.get(cube.rotation, { loop: true }).wait(500).to( { y: Math.PI*2 }, 1500, createjs.Ease.getPowInOut(3)).wait(500);
}

function animate() {
  renderer.render(scene, camera);
}