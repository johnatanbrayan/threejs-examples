const camera, scene, renderer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);

  camera.setSize(window.innerWidth / window.innerHeight);

  const render = function() {
    renderer.render(scene, camera);
  }

  animate();

  function animate() {
    render();
  }
}
