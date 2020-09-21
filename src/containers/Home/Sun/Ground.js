const THREE = require('three');


export default class Ground {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
    };
    this.obj = this.createObj();
    this.obj.position.set(0, -200, 0);
  }
  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1024, 1024, 32, 32),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: require('./glsl/ground.vs').default,
        fragmentShader: require('./glsl/ground.fs').default,
        transparent: true,
        wireframe: true
      })
    )
  }
  render(time) {
    this.uniforms.time.value += time;
  }
}
