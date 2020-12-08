function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  const container = document.body;
  container.appendChild( renderer.domElement );

  container.addEventListener( 'click', onClick );

  container.addEventListener( 'mousemove', onMouseMove );

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

  /* Rendering the Scene */
  animate();

  /* Add Tooltip */
  addTooltip( new THREE.Vector3( -18.44473765293672, -5.421965978565057, -46.072338908811915 ) );

  /* Tooltip */
  function addTooltip( position, name ) {
    let spriteMap = new THREE.TextureLoader().load( '/img/info-icon.png' );
    let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
    let sprite = new THREE.Sprite( spriteMaterial );
    sprite.name = name;
    // const position = new THREE.Vector3( -4.8, -1, -13 );
    sprite.position.copy( position.clone().normalize().multiplyScalar(30) );
    sprite.scale.multiplyScalar( 2.1 );
    scene.add( sprite );
  }
  
  /* Method to click info-icon */
  function onClick(e) {
    let mouse = new THREE.Vector2(
      ( e.clientX / window.innerWidth ) * 2 - 1,
      - ( e.clientY / window.innerHeight ) * 2 + 1,
    );
    // console.log(mouse);
    
    let rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera( mouse, camera );
    let intersects = rayCaster.intersectObjects( scene.children );
    intersects.forEach( function ( intersect ) {
      if ( intersects.object.type === 'Sprite' ) {
        console.log( intersects.object.name );
      }
    });
    /**
    let intersects = rayCaster.intersectObject( sphere );
    if ( intersects.length > 0 ) {
      console.log( intersects[0].point );
      addTooltip( intersects[0].point );
    }
    **/
  }

  function onMouseMove() {
    
  }

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
