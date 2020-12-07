function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  /* Make window responsible */
  window.addEventListener( 'resize', onResizeWindow );

  /* Scene */
  const scene = new THREE.Scene();

  /* Camera */
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 4.6;
  // camera.position.y = 0.66;

  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  /* Object Geometry */
  const geometry = new THREE.BoxGeometry( 1.2, 1.7, 1 );
  const material = new THREE.MeshBasicMaterial({ color: 0x93CCEA });
  const cube = new THREE.Mesh( geometry, material );
  cube.material.transparent = true;
  cube.material.opacity = 0;

  /* Add Scene */
  scene.add(cube);

  /* Animate with Tweenjs */
  createjs.Ticker.timingMode = createjs.Ticker.RAF; 
  createjs.Ticker.addEventListener( "tick", animate );
  createjs.Tween.get( cube.material, { loop: true }).to({ opacity: 1 }, 500 ).wait( 1500 ).to({ opacity: 0}, 500);
  createjs.Tween.get( cube.rotation, { loop: true }).wait( 500 ).to( { y: Math.PI*2 }, 1500, createjs.Ease.getPowInOut( 3 ) ).wait( 500 );

  /* Method to make window responsible */
  function onResizeWindow() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  
  /* Method to rendering scene */
  function animate() {
    renderer.render( scene, camera );
  }
}
