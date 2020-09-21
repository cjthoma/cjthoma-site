import React, { Component } from 'react';

const THREE = require('three');

// const SmoothScrollManager = require('../smooth_scroll_manager/SmoothScrollManager').default;
const TitleObject = require('./TitleObject').default;
const FrameObject = require('./FrameObject').default;
const SkyOctahedron = require('./SkyOctahedron').default;
const SkyOctahedronShell = require('./SkyOctahedronShell').default;
const Ground = require('./Ground').default;
const Debris = require('./Debris').default;
const PostEffect = require('./PostEffect').default;

class init extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  initFunc = () => {

    const canvas = this.ref.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: canvas,
    });
    const renderBack = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const sceneBack = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const cameraBack = new THREE.PerspectiveCamera(45, document.body.clientWidth / window.innerHeight, 1, 10000);
    const clock = new THREE.Clock();

    const titleObject = new TitleObject();
    const frameObject = new FrameObject();
    const skyOctahedron = new SkyOctahedron();
    const skyOctahedronShell = new SkyOctahedronShell();

    const postEffect = new PostEffect(renderBack.texture);

    const elemIntro = document.getElementsByClassName('js-transition-intro');

    const resizeWindow = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = window.innerHeight;
      cameraBack.aspect = document.body.clientWidth / window.innerHeight;
      cameraBack.updateProjectionMatrix();
      renderBack.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setSize(document.body.clientWidth, window.innerHeight);
      postEffect.resize();
    }
    const render = () => {
      const time = clock.getDelta();
      skyOctahedron.render(time);
      skyOctahedronShell.render(time);
      renderer.setRenderTarget(renderBack);
      renderer.render(sceneBack, cameraBack);
      postEffect.render(time);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    }
    const renderLoop = () => {
      render();
      requestAnimationFrame(renderLoop);
    }
    const on = () => {
      // window.addEventListener('resize', debounce(() => {
      //   resizeWindow();
      // }), 1000);

    }
    const transitionOnload = () => {
      for (var i = 0; i < elemIntro.length; i++) {
        const elm = elemIntro[i];
        elm.classList.add('is-shown');
      }
    }

    const init = () => {
      renderer.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setClearColor(0x111111, 1.0);
      cameraBack.position.z = 800;

      scene.add(postEffect.obj);
      titleObject.loadTexture(() => {
        sceneBack.add(titleObject.obj);
        sceneBack.add(skyOctahedron.obj);
        sceneBack.add(skyOctahedronShell.obj);
        transitionOnload();
      });

      clock.start();

      on();
      resizeWindow();
      renderLoop();
    }
    init();
  }
  
  componentDidMount() {
    this.initFunc()
  }

  render() {
    return(
      <canvas ref={this.ref}></canvas>
    );
  }
}

export default init;
