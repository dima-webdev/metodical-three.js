$(function() {

  var view, scena, rend; //камера, сцена, рендер
  var width, height;
  var grid, color;
  var kubikMat, kubikGeom, kubik;
  var sharGeom, sharMat, shar;
  var ploskGeom, ploskMat, plosk;
  var lightHelper;

  

  scena = new THREE.Scene();
  view = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  rend = new THREE.WebGLRenderer();


  width = window.innerWidth;
  height = window.innerHeight;

  /*управление мышью*/



  /*var controls = new THREE.OrbitControls(view, rend.domElement);
  controls.addEventListener('change', render);
  */




  //сглаживание теней
  rend.shadowMapType = THREE.PCFSoftShadowMap;
  rend.shadowMapEnabled = true;
  rend.shadowMapSoft = true;

  rend.setClearColor(0xdddddd);
  rend.setSize(width, height);


  /*
  Координатные линии
  axis = new THREE.AxisHelper(10);
  scene.add(axis);
  */

  //сетка

  grid = new THREE.GridHelper(50, 5, 0x000000, 0x000000);
  color = new THREE.Color("rgb(255, 0, 0)");
  //scena.add(grid);

  //сетка end

  //куб begin

  kubikGeom = new THREE.BoxGeometry(8, 8, 8);
  kubikMat = new THREE.MeshLambertMaterial({color: 0xff3300});
  kubik = new THREE.Mesh(kubikGeom, kubikMat);

  kubik.position.x = 2.5;
  kubik.position.y = 8.5;
  kubik.position.z = 2.5;
  kubik.castShadow = true;

  scena.add(kubik);

  //куб end

  /*шар begin*/

  sharGeom = new THREE.SphereGeometry (5, 32, 32);
  sharMat = new THREE.MeshLambertMaterial({color: 0xffff00});
  shar = new THREE.Mesh( sharGeom, sharMat);

  shar.position.x = 10.5;
  shar.position.y = 4.5;
  shar.position.z = 25.5;
  shar.castShadow = true;
  scena.add( shar );

  /*шар end*/

  //плоскость begin

  ploskGeom = new THREE.PlaneGeometry(90, 90, 90);
  ploskMat = new THREE.MeshLambertMaterial({color: 0xffffff});
  plosk = new THREE.Mesh(ploskGeom, ploskMat);

  plosk.rotation.x = -.5*Math.PI;
  plosk.receiveShadow = true;

  scena.add(plosk);

  //плоскость end

  view.position.x = 40;
  view.position.y = 40;
  view.position.z = 40;
  view.lookAt(scena.position);


  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.position.set (15, 30, 50);
  scena.add(spotLight);




  var guiControls = new function() {
    this.rotationX = 0.0;
    this.rotationY = 0.0;
    this.rotationZ = 0.0;

  }

  var datGUI = new dat.GUI();

  datGUI .add(guiControls, 'rotationX', 0, 1);
  datGUI .add(guiControls, 'rotationY', 0, 1);
  datGUI .add(guiControls, 'rotationZ', 0, 1);
  lightHelper = new THREE.SpotLightHelper( spotLight );
  scena.add(lightHelper);
  render();



  function render() {
    kubik.rotation.x += guiControls.rotationX;
    kubik.rotation.y += guiControls.rotationY;
    kubik.rotation.z += guiControls.rotationZ;
    requestAnimationFrame(render);
    rend.render(scena, view);


				lightHelper.update(); // required
				rend.render( scena, view );
  }


  rend.shadowMapType = THREE.PCFSoftShadowMap;

  rend.render(scena, view);
  $("#webGL-container").append(rend.domElement);

});
