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
  camera.position.z = 3;

  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  /* Create the shape */
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );

  /* Create a material, color or image texture */
  const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: false });
  const cube = new  THREE.Mesh( geometry, material );

  /* Add Scene */
  scene.add( cube );

  /* Run Game Loop */
  gameLoop();

  /* Run Game Loop ( update, render, repeat ) */
  function gameLoop() {
    requestAnimationFrame(gameLoop);
    update();
    /* Draw Scene */
    renderer.render(scene, camera);
  };

  /* Game Logic */
  function update() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005; 
  };

  /* Method to resize window automatically */
  function onResizeWindow() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}