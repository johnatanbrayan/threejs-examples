var camera, renderer, scene;

function init() {
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
  scene = new THREE.Scene();

  camera.position.set(-900, -200, -900);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', renderer);

  var materialArray = [];
  var texture_ft = new THREE.TextureLoader().load('/img/arid_ft.jpg');
  var texture_bk = new THREE.TextureLoader().load('/img/arid_bk.jpg');
  var texture_up = new THREE.TextureLoader().load('/img/arid_up.jpg');
  var texture_dn = new THREE.TextureLoader().load('/img/arid_dn.jpg');
  var texture_rt = new THREE.TextureLoader().load('/img/arid_rt.jpg');
  var texture_lf = new THREE.TextureLoader().load('/img/arid_lf.jpg');

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  var skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);


}