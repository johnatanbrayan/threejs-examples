function init() {
  
  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement ); 

  /* Enable special zoom on virtual tour */
  document.addEventListener( 'wheel', onDocumentMouseWheel, false );

  /* Make window responsible */
  window.addEventListener( 'resize', onWindowResize );

  /* Scene */
  const scene = new THREE.Scene();

  /* Camera */
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( -1, 0, 0 );
  
  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.rotateSpeed = - 0.42;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.update(); // Must be called after any manual changes to the camera's transform

  /* Object geometry */
  const geometry = new THREE.SphereGeometry( 50, 32, 32 );
  const texture = new THREE.TextureLoader().load( '/content/img360/photosphere1.jpg' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;  
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh( geometry, material );

  /* Add scene */
  scene.add( sphere );

  /* Rendering the scene */
  animate();

  /* Method to resize windows automatically */
  function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  /* Method to make special zoom on tour */
  function onDocumentMouseWheel( event ) {
    const fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );
    camera.updateProjectionMatrix();
  }
  
  /* Method to rendering the scene */
  function animate() {
    requestAnimationFrame( animate );
    controls.update(); // Is necessary if dumping is enable;
    renderer.render( scene, camera );
  }
}
