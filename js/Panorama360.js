let camera, scene, renderer;

function init() {
  scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = THREE.OrbitControls(camera, renderer.domElement);
  // controls.rotateSpeed = 0.2;
  // controls.enableZoom = false;
  camera.position.set(1, 0, 0);
  // controls.update();

  // camera.setSize(window.innerWidth / window.innerHeight);

  let geometry = new THREE.SphereGeometry(50, 32, 32);
  let textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load('/img/360.jpeg');
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  let sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
  }
  window.addEventListener('resize', onResize);
}
