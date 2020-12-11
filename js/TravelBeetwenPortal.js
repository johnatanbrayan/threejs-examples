let spriteActive = false;

function init() {

  /* Configure Renderer */
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
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
  camera.position.set( 1, 0.2, 0.8 );

  /* Control */
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.rotateSpeed = 0.41;
  controls.update();

  /* Rendering the Scene */
  animate();

  /* ---------------------------CLASS TO CREATE A SCENE PANORAMA WITH PORTAL---------------------------- */
  class Scene {
    constructor( image ) {
      this.image = image;
      this.points = [];
      this.sprites = [];
      this.scene = null;
    }

    /* Method to create a panorama scene */
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
      this.points.forEach( this.addTooltip.bind( this ) );
    }

    /* Method to add Tooltip sprite */
    addTooltip( point ) {
      let spriteMap = new THREE.TextureLoader().load( '/content/icon/info-icon.png' );
      let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
      let sprite = new THREE.Sprite( spriteMaterial );

      sprite.name = point.name;
      sprite.position.copy( point.position.clone().normalize().multiplyScalar( 25 ) );
      sprite.scale.multiplyScalar( 2 );

      this.scene.add( sprite );
      this.sprites.push( sprite );

      sprite.onClick = () => {
        this.destroy(); 
        point.scene.createScene( scene );
        point.scene.appear();
      };
    }

    /* Method to add points */
    addPoint( point ) {
      this.points.push( point );
    }

    /* */
    destroy() {
      TweenLite.to( this.sphere.material, 1, {
        opacity: 0,
        onComplete: () => {
          this.scene.remove( this.sphere );
        }
      });

      this.sprites.forEach( ( sprite ) => {
        TweenLite.to( sprite.scale, 1, { 
          x: 0, y: 0, z: 0,
          onComplete: () => {
            this.scene.remove( sprite );
          }
        });
      });
    }

    /* */
    appear() {
      this.sphere.material.opacity = 0;

      TweenLite.to( this.sphere.material, 1, { opacity: 1 } );
      this.sprites.forEach( ( sprite ) => {
        sprite.scale.set( 0, 0, 0 );
        TweenLite.to( sprite.scale, 1, { x: 2, y: 2, z: 2 } );
      });
    }
  }
  /* --------------------------------------------------------------------------------------------------- */

  /* ----------------------------------ADD AND CREATE NEW PLACE SCENE----------------------------------- */
  let placeScene1 = new Scene( '/content/img360/360-4.jpg');
  let placeScene2 = new Scene( '/content/img360/360-2.jpg');

  placeScene1.addPoint({
    position: new THREE.Vector3( -18.44473765293672, -5.421965978565057, -46.072338908811915 ),
    name: 'MAGIC PORTAL??',
    scene: placeScene2,
  });

  placeScene2.addPoint({
    position: new THREE.Vector3( 28.70438280957294, -8.623731793692764, 39.79271818313986 ),
    name: 'FARM',
    scene: placeScene1, 
  });

  placeScene1.createScene( scene );
  /* --------------------------------------------------------------------------------------------------- */

  /* ------------------------METHOD TO SET ACTION WHEN MOVE MOUSE ON BUTTON ICON------------------------ */
  function onMouseMove( e ) {
    let foundSprite = false;
    let mouse = new THREE.Vector2(
      ( e.clientX / window.innerWidth ) * 2 - 1, - ( e.clientY / window.innerHeight ) * 2 + 1,
    );

    rayCaster.setFromCamera( mouse, camera );
    let objectIntersects = rayCaster.intersectObjects( scene.children );
    objectIntersects.forEach( ( objectIntersect ) => {
      if ( objectIntersect.object.type === 'Sprite' ) {
        let p = objectIntersect.object.position.clone().project( camera );
        tooltip.style.top = ( ( -1 * p.y + 1 ) * window.innerHeight / 2 ) + 'px';
        tooltip.style.left = ( ( p.x + 1 ) * window.innerWidth / 2) + 'px';
        tooltip.classList.add('is-active');
        tooltip.innerHTML = objectIntersect.object.name;
        spriteActive = objectIntersect.object;
        foundSprite = true;
      }
    });

    if ( foundSprite === false && spriteActive ) {
      tooltip.classList.remove('is-active');
      spriteActive = false;
    }
  }
  /* ------------------------------------------------------------------------------------------------- */

  /* Method to click info-icon */
  function onClick( e ) {
    let mouse = new THREE.Vector2(
      ( e.clientX / window.innerWidth ) * 2 - 1, - ( e.clientY / window.innerHeight ) * 2 + 1,
    );
    
    rayCaster.setFromCamera( mouse, camera );
    let objectIntersects = rayCaster.intersectObjects( scene.children );
    objectIntersects.forEach( ( objectIntersect ) => {
      if ( objectIntersect.object.type === 'Sprite' ) {
        objectIntersect.object.onClick();
      }
    });
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
