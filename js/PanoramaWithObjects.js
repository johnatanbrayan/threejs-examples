let tooltipActive = false;

function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  document.body.appendChild( renderer.domElement );

  /* Get div with class tooltip on html */
  const tooltip = document.querySelector('.tooltip');
  
  /* Method to get event when click on button icon */
  document.body.addEventListener( 'click', onClick );

  /* Method to get event when move mouse on icon */
  document.body.addEventListener( 'mousemove', onMouseMove );
  
  /* Resize panorama with window */
  window.addEventListener( 'resize', onWindowResize );

  /* Scene */
  const scene = new THREE.Scene();

  /* Treats image */
  const rayCaster = new THREE.Raycaster();

  /* Camera */
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( -5, -0.5, -1.2 );

  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.rotateSpeed = - 0.42;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.update();
  
  /* Object Geometry */
  const geometry = new THREE.SphereGeometry( 50, 32, 32 );
  const texture = new THREE.TextureLoader().load( '/content/img360/kandao3.jpg' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;  
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh( geometry, material );

  /* Add Scene */
  scene.add( sphere );
  
  /* Add Tooltip */
  addTooltip( new THREE.Vector3( 44.0959313763085, 8.651250296182077, 22.376586797720087 ), 'Informação' );

  /* Rendering the Scene */
  animate();

  /* Method to add Tooltip sprite */
  function addTooltip( position, name ) {
    let spriteMap = new THREE.TextureLoader().load( '/content/icon/info-icon.png' );
    let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
    let sprite = new THREE.Sprite( spriteMaterial );
    sprite.name = name;
    sprite.position.copy( position.clone().normalize().multiplyScalar( 30 ) );
    sprite.scale.multiplyScalar( 2.1 );
    scene.add( sprite );
  }

  /* Method to set action when move mouse on button icon */
  function onMouseMove( e ) {
    let foundSprite = false;
    let mouse = new THREE.Vector2( ( e.clientX / window.innerWidth ) * 2 - 1, - ( e.clientY / window.innerHeight ) * 2 + 1,);

    rayCaster.setFromCamera( mouse, camera );
    let objectIntersects = rayCaster.intersectObjects( scene.children );
    objectIntersects.forEach( ( objectIntersect ) => {
      if ( objectIntersect.object.type === 'Sprite' ) {
        let p = objectIntersect.object.position.clone().project( camera );
        tooltip.style.top = ( ( -1 * p.y + 1 ) * window.innerHeight / 2 ) + 'px';
        tooltip.style.left = ( ( p.x + 1 ) * window.innerWidth / 2) + 'px';
        tooltip.classList.add( 'is-active' );
        tooltipActive = true;
        foundSprite = true;
      }
    });

    if ( foundSprite === false && tooltipActive ) {
      tooltip.classList.remove( 'is-active' );
    }
  }
  
  /* Method to set action when click button icon */
  function onClick( e ) {
    let mouse = new THREE.Vector2( ( e.clientX / window.innerWidth ) * 2 - 1, - ( e.clientY / window.innerHeight ) * 2 + 1 );
    
    rayCaster.setFromCamera( mouse, camera );
    let objectIntersects = rayCaster.intersectObjects( scene.children );
    /** 
     * With objectIntersects[0].point you can get the position 3d on click, You get the Vector3d
     * console.log( objectIntersects[0].point );
    **/

    objectIntersects.forEach( ( objectIntersect ) => {
      if ( objectIntersect.object.type === 'Sprite' ) {
        console.log( objectIntersect.object.name );
      }
    });
  }

  /* Method to rendering the scene */
  function animate() {
    requestAnimationFrame( animate );
    controls.update(); // required when damping is enabled
    renderer.render( scene, camera );
  }

  /* Method to resize panorama with window */
  function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}
