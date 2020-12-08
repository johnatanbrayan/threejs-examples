function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  /* Resize panorama with window */
  window.addEventListener( 'resize', onWindowResize );

  /* Scene */
  const scene = new THREE.Scene();

  /* Camera */
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( 1, 0.2, 0.8 );

  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.rotateSpeed = 0.41;
  controls.update();

  /* Object Geometry */
  const geometry = new THREE.SphereGeometry( 50, 32, 32 );
  const texture = new THREE.TextureLoader().load( '/img/360-4.jpg' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;  
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh( geometry, material );

  /* Add Scene */
  scene.add( sphere );

  /* Tooltip */
  const spriteMap = new THREE.TextureLoader().load( '/img/info-icon.png' );
  const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
  const sprite = new THREE.Sprite( spriteMaterial );
  const position = new THREE.Vector3( -4.8, -1, -13 );
  sprite.position.copy( position );
  scene.add( sprite );

  /* Rendering the Scene */
  animate();

  /* Method to rendering the scene */
  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  /* Method to resize panorama with window */
  function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}
