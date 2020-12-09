function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  const container = document.body;
  const tooltip = document.querySelector('.tooltip');
  let spriteActive = false;

  class Scene {
    constructor( image ) {
      this.image = image;
      this.points = [];
      this.sprites = [];
      this.scene = null;
    }

    createScene( scene ) {
      this.scene = scene;
      /* Object Geometry */
      const geometry = new THREE.SphereGeometry( 50, 32, 32 );
      const texture = new THREE.TextureLoader().load( this.image );
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1;  
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      material.transparent = true;
      this.sphere = new THREE.Mesh( geometry, material );

      /* Add Scene */
      this.scene.add( this.sphere );
      this.points.forEach( this.addTooltip.bind(this) );
    }

    addPoint( point ) {
      this.points.push( point );
    }

    /* Tooltip */
    addTooltip( point ) {
      let spriteMap = new THREE.TextureLoader().load( '/content/icon/info-icon.png' );
      let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
      let sprite = new THREE.Sprite( spriteMaterial );
      sprite.name = point.name;
      // const position = new THREE.Vector3( -4.8, -1, -13 );
      sprite.position.copy( point.position.clone().normalize().multiplyScalar(30) );
      sprite.scale.multiplyScalar( 2.1 );
      this.scene.add( sprite );
      this.sprites.push( sprite );
      sprite.onClick = () => {
        this.destroy(); 
        point.scene.createScene( scene );
        point.scene.appear();
      };
    }

    destroy() {
      TweenLite.to(this.sphere.material, 1, {
        opacity: 0,
        onComplete: () => {
          this.scene.remove( this.sphere );
        }
      });
      this.sprites.forEach( ( sprite ) => {
        TweenLite.to(sprite.scale, 1, {
          x: 0, y: 0, z: 0,
          onComplete: () => {
            this.scene.remove( sprite );
          }
        });
      });
    }

    appear() {
      this.sphere.material.opacity = 0;
      TweenLite.to(this.sphere.material, 1, {
        opacity: 1
      });
      this.sprites.forEach( ( sprite ) => {
        sprite.scale.set( 0, 0, 0 );
        TweenLite.to(sprite.scale, 1, {
          x: 2, y: 2, z: 2
        });
      });
    }
  }

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

  /* Rendering the Scene */
  animate();

  /* Sphere */
  let s = new Scene( '/content/img360/360-4.jpg');
  let s2 = new Scene( '/content/img360/360-2.jpg');
  s.addPoint({
    position: new THREE.Vector3( -18.44473765293672, -5.421965978565057, -46.072338908811915 ),
    name: 'MAGIC PORTAL??',
    scene: s2
  });
  s2.addPoint({
    position: new THREE.Vector3( -18.44473765293672, -5.421965978565057, -46.072338908811915 ),
    name: 'FARM',
    scene: s
  });
  s.createScene( scene );
  

  function onMouseMove(e) {
    let mouse = new THREE.Vector2(
      ( e.clientX / window.innerWidth ) * 2 - 1,
      - ( e.clientY / window.innerHeight ) * 2 + 1,
    );
    rayCaster.setFromCamera( mouse, camera );
    let foundSprite = false;
    let intersects = rayCaster.intersectObjects( scene.children );
    intersects.forEach( function ( intersect ) {
      if ( intersect.object.type === 'Sprite' ) {
        let p = intersect.object.position.clone().project( camera );
        // console.log( intersect.object.name );
        tooltip.style.top = ( ( -1 * p.y + 1 ) * window.innerHeight / 2 ) + 'px';
        tooltip.style.left = ( ( p.x + 1 ) * window.innerWidth / 2) + 'px';
        tooltip.classList.add('is-active');
        tooltip.innerHTML = intersect.object.name;
        spriteActive = intersect.object;
        foundSprite = true;
      }
    });

    if ( foundSprite === false && spriteActive ) {
      tooltip.classList.remove('is-active');
      spriteActive = false;
    }
  }
  
  const rayCaster = new THREE.Raycaster();

  /* Method to click info-icon */
  function onClick(e) {
    let mouse = new THREE.Vector2(
      ( e.clientX / window.innerWidth ) * 2 - 1,
      - ( e.clientY / window.innerHeight ) * 2 + 1,
    );
    // console.log(mouse);
    
    // let rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera( mouse, camera );
    let intersects = rayCaster.intersectObjects( scene.children );
    intersects.forEach( function ( intersect ) {
      if ( intersect.object.type === 'Sprite' ) {
        // console.log( intersect.object.name );
        intersect.object.onClick();
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
