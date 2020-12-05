
function init() {
  
  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onResize );

  /* Renderer */
  const scene = new THREE.Scene();

  /* Camera */
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  /* Controls */
  const controls = THREE.OrbitControls( camera, renderer.domElement );
  
  /* controls.update() must be called after any manual changes to the camera's transform */
  camera.position.set(-1, 0, 0);
  // camera.position.set(1, 0, 0);
  // controls.enableZoom = false;
  // controls.rotateSpeed = 0.2;
  // controls.update();

  /* Object geometry */
  const geometry = new THREE.SphereGeometry(50, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/img/360.jpeg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh(geometry, material);

  scene.add(sphere);

  animate();

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
}
