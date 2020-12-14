function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  document.body.appendChild( renderer.domElement );
  
  /* Resize window automatically */
  window.addEventListener( 'resize', onWindowResize );

  /* Scene */
  const scene = new THREE.Scene();
  
  /* Camera */
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 45, 30000 );
  camera.position.set( -900, -200, -900 );
  
  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.minDistance = 500;
  controls.maxDistance = 1500;
  controls.rotateSpeed = 0.41;
  controls.update();

  /* Object Geometry */
  const materialArray = [];
  const texture_ft = new THREE.TextureLoader().load( '/content/img360/arid/arid_ft.jpg' );
  const texture_bk = new THREE.TextureLoader().load( '/content/img360/arid/arid_bk.jpg' );
  const texture_up = new THREE.TextureLoader().load( '/content/img360/arid/arid_up.jpg' );
  const texture_dn = new THREE.TextureLoader().load( '/content/img360/arid/arid_dn.jpg' );
  const texture_rt = new THREE.TextureLoader().load( '/content/img360/arid/arid_rt.jpg' );
  const texture_lf = new THREE.TextureLoader().load( '/content/img360/arid/arid_lf.jpg' );
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for( let i = 0; i < 6; i++ ) {
    materialArray[i].side = THREE.BackSide;
  }
  
  const skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000 );
  const skybox = new THREE.Mesh( skyboxGeo, materialArray );

  /* Add scene */
  scene.add( skybox );

  /* Rendering the scene */
  animate();

  /* Resize window automatically */
  function onWindowResize() {
    renderer.setSize( window.innerWidth / window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  /* Method to rendering the scene */
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
}
