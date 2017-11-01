function onResize() {
  rend.setSize( window.innerWidth, window.innerHeight );
  view.aspect = ( window.innerWidth / window.innerHeight );
  view.updateProjectionMatrix();
}
