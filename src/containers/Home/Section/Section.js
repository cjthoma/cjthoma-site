import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImprovedNoise } from '../../../js/math/ImprovedNoise';
import * as THREE from 'three';
import * as P5 from 'p5';
import * as gsap from 'gsap';

import Aux from '../../../hoc/Aux';
import style from './Section.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';

class Section extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();  
    }

    componentDidMount() {
        let scene, renderer, geometry, material, camera;
        var worldWidth = 256, worldDepth = 256,
                worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

        let terrainMesh;
        const canvas = this.canvasRef.current;
        const clock = new THREE.Clock();

        init();
        animate();

        function init() {
            scene = new THREE.Scene();
            renderer = new THREE.WebGLRenderer();

            geometry = new THREE.PlaneBufferGeometry(7500, 7500, worldWidth - 1, worldDepth - 1); // (Width: 0, Height: 0, Width_Segments: 0, Height_Segments: 0)
            geometry.rotateX( Math.PI / 4 );

            material = new THREE.MeshBasicMaterial({ 
                color: 0x00ff00,
                wireframe: true,
            });

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            canvas.appendChild(renderer.domElement);
            camera.position.z = 100;

            terrainMesh = new THREE.Mesh( geometry, material );
            scene.add(terrainMesh);

            // Window Resize Handler
            window.addEventListener( 'resize', onWindowResize, false );
        }

        function generateHeight(width, height, t) {
            var size = width * height, data = new Uint8Array( size ),
                perlin = new ImprovedNoise(), quality = 1, z = t;

            for ( var j = 0; j < 4; j ++ ) {
                for ( var i = 0; i < size; i ++ ) {
                    var x = i % width, y = ~ ~ ( i / width );
                    data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
                }
                quality *= 5;
            }
            return data;
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function animate() {
            let t, data, vertices;
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            
            t = clock.getElapsedTime();
            data = generateHeight( worldWidth, worldDepth, t/10);
            vertices = geometry.attributes.position.array;
            for (let i = 0, e = 0, length = vertices.length; i < length; i ++, e += 3) {
                vertices[e + 1] = data[i] * 10;
            }

            terrainMesh.geometry.attributes.position.needsUpdate = true;
        }
    }

    render() {
        return (
        <Aux>
            {/* { home } */}
            <section ref={this.canvasRef}></section>
        </Aux>
        );
    };
};



const mapStateToProps = (state) => {
    return {
        colors: { ...state.reducer.colors },
        mask: { ...state.reducer.mask},
        navFocusItem: state.reducer.navFocusItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mouseMove: (event) => dispatch({type: actionTypes.MOUSE_MOVE, payload: event}),
        onPageScroll: (event) => dispatch({type: actionTypes.ON_SCROLL_HANDLER, payload: event}),
        fetchInitState: () => dispatch(actions.fetchInitState()),
        fetchProjects: () => dispatch(actions.fetchProjects()),
        authCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);