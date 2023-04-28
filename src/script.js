import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { Object3D } from 'three'
import TWEEN from '@tweenjs/tween.js'
import { InteractionManager } from 'three.interactive';

/**
 * FOR INTERACTION WITH THE GLTF OBJECTS
 * 
 */

/**
 * GET DATA FROM GSHEETS FIRST
 */

/**
 *                                  USING 2D ARRAYS INSTEAD OF ARRAY OF OBJECTS
 */
/**                         column
 *               index      name_participant       char_wanted       totalScore       totalFruits       totalPreach     totalPreach_mean        bonus
 *     rows                     shane               1                   5000                5               878         112                     444
 *
 *      rows                 AND SO ON....
 *               
 *               
 *               
 *               
 */
let gs_data2threejs =[[]]; //TWO DIMENSIONAL ARRAY

var mixer_total;
var loader2 = new GLTFLoader();
let modelGlb=[];
let abc=[];
const mixers = [];

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x131A3D, 1);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 1, 2000)
scene.add(camera)
camera.position.set(0, 15, 100)


const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );


            function onComplete(allData){ // When the code completes, do this

                
                    allData = allData.replace(/[""]+/g,'"'); //dont' know why data has extra ""  so remove them
                    allData = allData.replace('"[{','[{'); //dont' know why data has extra ["  so remove them
                    allData = allData.replace('}]"','}]'); 
                    
                    var sheet_arrayObject = JSON.parse(allData);
/**
 * 
 *                  NOW HERE YOU CAN ACCESS THE DATA WITH 
 *                      myobje[i].id
 * 
 */

                 console.log(sheet_arrayObject);
                 // myobje.map(x => console.log(x.Id)); to loop it through                     
                    
                let modelGlburl = [];
                
                var i;
                var mesh =[];
            
                    var participants = Object.keys(sheet_arrayObject).length;
                        
            
                        // for(i=0;i<participants;i++){
                            // var wanted_char = sheet_arrayObject[i].character;
                         
                            const forLoop = async _ => {
                                console.log("Start");
                                
                               for (let index = 0; index < participants; index++) {
                                var tempsheetObject = sheet_arrayObject[index]
                                const numFruit = await myPromise(tempsheetObject);
                                console.log(numFruit);
                                }
                                
                               console.log("End");
                               };
                               forLoop();


                           
                        // }

                    //   var  str = JSON.stringify(modelGlb[2]);
                    //     str = JSON.stringify(modelGlb[2], null, 4); // (Optional) beautiful indented output.
                    //     console.log(str);
                // console.log(result)

            }





/**
 * 
 *                          A PROMISE FUNCTION DECLARATION HERE
 */

            const myPromise = tempsheetObject => {
                // Perform some asynchronous operation
                // If the operation is successful, call the resolve function with the result
                // If the operation fails, call the reject function with the error
                console.log(tempsheetObject.Id);
                var i = tempsheetObject.Id;
                var score = tempsheetObject.Total;
                // console.log(i);
                let modelGlburl = [];
                var mesh =[];
                            modelGlburl[i]= './assets/glb/low-size/model'+tempsheetObject.character+'.glb';
                            var str = modelGlburl[i];
                                loader2.load(modelGlburl[i],function(glb){
                                modelGlb [i]= glb.scene;
                                modelGlb[i].position.set(500,1,1); 
                                let mm= modelGlb[i];
                                //planeFighter
                                console.log(str);
                                if( str.indexOf('1') >= 0) {modelGlb[i].rotateY(90); modelGlb[i].scale.set(0.2,0.2,0.2); console.log("set plane"); }
                                //bird
                                if( str.indexOf('3') >= 0) {modelGlb[i].rotateY(45); modelGlb[i].scale.set(0.5,0.5,0.5); console.log("set bird"); }
                                //ww2 plane
                                if( str.indexOf('4') >= 0) {modelGlb[i].rotateY(15);  console.log("set plane3"); }
                                //ww2 plane
                                if( str.indexOf('5') >= 0) {modelGlb[i].rotateY(10); modelGlb[i].scale.set(0.2,0.2,0.2); console.log("set plane3"); }
                                //butterfly
                                if( str.indexOf('6') >= 0) {modelGlb[i].rotateY(10); modelGlb[i].scale.set(0.8,0.8,0.8); console.log("set plane3"); }
                                //red plane
                                if( str.indexOf('7') >= 0) {modelGlb[i].rotateY(45);  modelGlb[i].scale.set(0.8,0.8,0.8); console.log("set plane3"); }
                            
                                interactionManager.add(modelGlb[i]);
                                modelGlb[i].addEventListener('click', (event) => {
                                    var root = modelGlb[i];
                                            // compute the box that contains all the stuff
                                        // from root and below
                                        const box = new THREE.Box3().setFromObject(root);
                                        const boxSize = box.getSize(new THREE.Vector3()).length();
                                        const boxCenter = box.getCenter(new THREE.Vector3());
                    
                                        // set the camera to frame the box
                                        frameArea(boxSize * 2, boxSize, boxCenter, camera);
                                });
                                gsap.to( modelGlb[i].position, {
                                    duration: 9,
                                    y: 18,
                                    z:10 ,
                                    repeat: -1,
                                    yoyo: true,
                                    ease: 'power3.inOut'
                                });  
                                gsap.to( modelGlb[i].position,  {
                                    duration: 20,
                                    // y: -8,
                                    x: score,
                                    // yoyo: true,
                                    // repeat: 1,
                                    ease: 'power3.inOut'
                                });
                                
                                scene.add(modelGlb[i]);
                                abc[i] = modelGlb[i].children[0];
                                const mixer = new THREE.AnimationMixer(abc[i]);
                                mixer.clipAction(glb.animations[0]).play();
                                mixers.push(mixer);
                                console.log(i)
                            }); 
                            // return resolve;
              };
              











function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {

    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 200;
    camera.far = boxSize * 1000;

    camera.updateProjectionMatrix();
    function tweenCamera( targetPosition, duration ) {

        // controls.enabled = false;
    
        var position = new THREE.Vector3().copy( camera.position );
    
        var tween = new TWEEN.Tween( position )
            .to( targetPosition, duration )
            .easing( TWEEN.Easing.Back.InOut )
            .onUpdate( function () {
                camera.position.copy( position );
                camera.lookAt( controls.target );
            } )
            .onComplete( function () {
                camera.position.copy( targetPosition );
                camera.lookAt( controls.target );
                controls.enabled = true;
            } )
            .start();
    
    }
    
    var targetPosition = new THREE.Vector3(boxCenter.x, boxCenter.y, boxCenter.z);
    var duration = 5000;
    
    tweenCamera( targetPosition, duration );
    // point the camera to look at the center of the box
    // camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }



/**
 * Base 
 */

const planets = [
    {name: 'mercury', sizeRatio: 100/277, position: 15, rotation: 0.002},
    {name: 'venus', sizeRatio: 100/133, position: 20, rotation: 0.0075},
    {name: 'earth', sizeRatio: 100/103, position: 25, rotation: 0.0065},
    {name: 'mars', sizeRatio: 100/208, position: 30, rotation: 0.0025},
    {name: 'jupiter', sizeRatio: 30/9.68, position: 40, rotation: 0.0055},
    {name: 'saturn', sizeRatio: 30/11.4, position: 50, rotation: 0.004},
    {name: 'uranus', sizeRatio: 30/26.8, position: 60, rotation: 0.006},
    {name: 'neptune', sizeRatio: 30/27.7, position: 70, rotation: 0.003},
    // {name: 'galaxy', sizeRatio: 100/277, position: 75, rotation: 0.002},
]

const orbitRadius = [15, 20, 25, 30, 40, 50, 60, 70]

const orbitsObject3D = []
const planetsObject3D = []

/**
 * Objects
 */

//  const loader = new THREE.FontLoader(); 
//  let geometry;
//  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
 
//     geometry =  new THREE.TextGeometry( 'Three.js Solar System', {
//         font: font,
//         size: 80,
//         height: 20,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     } );
// } )

//  const textMesh = new THREE.Mesh(
//     geometry,
//     new THREE.MeshNormalMaterial()
// )
// scene.add(textMesh)
// textMesh.position.y = 20
// const textureLoader = new THREE.TextureLoader()

// scene.background = textureLoader.load('/textures/stars.jpg')

/**
 * AND HERE COMES THE GALAXY GLB
 */

//FOR floating stars
var sphereTab = [];

    for (var i = 0; i < 500; i++) {
        // randRadius = Math.random()*30+10;
       var lumiereS = new THREE.MeshPhongMaterial({
            emissive: '#C278F4'
        });
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 1, 20, 20), lumiereS));
    }
    for (var i = 0; i < sphereTab.length; i++) {
        sphereTab[i].position.set(Math.random() * 1200 - 500, Math.random() * 1200 - 500, Math.random() * 1200 - 500);
        scene.add(sphereTab[i]);
    }
    
   


const orbitMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );

const saturnRing =  new THREE.Mesh(  new THREE.TorusGeometry( 5, 0.05, 16, 100), orbitMaterial );
saturnRing.rotateX( Math.PI/2.5)

const createPlanets = () => {
    
    planets.forEach((planet, index) => {
        const orbitGroup = new THREE.Group()
        const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(orbitRadius[index], 0.05, 16, 100),
            orbitMaterial
        )
        
        // const texture = textureLoader.load(`/textures/${planet.name}.jpg`)
        // const planetObject = new THREE.Mesh( 
        //     new THREE.SphereGeometry( planet.sizeRatio, 32, 32 ),
        //     new THREE.MeshStandardMaterial({ map: texture}))

        // planetObject.position.x = planet.position

        // if(planet.name === 'saturn') {
        //     saturnRing.position.x = planet.position
        //     orbitGroup.add(saturnRing)
        // }
        orbitGroup.add(orbit)

        orbit.rotateZ(Math.PI /2)
        orbit.rotateY(Math.PI/2)
        orbitsObject3D.push(orbitGroup)
        // planetsObject3D.push(planetObject)
        scene.add(orbitGroup)
    })
}
const clock = new THREE.Clock();
createPlanets();


const ambientLight = new THREE.AmbientLight( '#fffefa' ); // soft white light

const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

scene.add( ambientLight, hemisphereLight)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.zoomSpeed = 1.5
// controls.minZoom = 200
controls.maxDistance =1000

// const axesHelper = new THREE.AxesHelper(20);
// scene.add(axesHelper)

/**
 * Debug
 */
const gui = new dat.GUI({
    closed: true,
    width: 400
})


/**
 * Animate
 */

const tick = () =>
{   //interaction manager
    interactionManager.update();

    const delta = clock.getDelta();
    mixers.forEach(function(mixer) {
        mixer.update(delta);
    });
    // if ( mixer[1] ) mixer[1].update( delta );
    // if ( mixer[2] ) mixer[2].update( delta );
    // if ( mixer[0] ) mixer[0].update( delta );
    // if ( mixer[3] ) mixer[3].update( delta );

    var timer = 0.00001 * Date.now();
    for (var i = 0, il = sphereTab.length; i < il; i++) {
        var sfere = sphereTab[i];
        sfere.position.x = 400 * Math.sin(timer + i);
        sfere.position.z = 400 * Math.sin(timer + i * 1.1);
    }

    // var axis = new THREE.Vector3(0, 1, 0).normalize();
    // if (galaxy) sun.rotateOnAxis(axis,0.01)


    orbitsObject3D.forEach((group, index) => {
        group.rotation.y += planets[index].rotation
    })

    planetsObject3D.forEach((planet, index) => {
        planet.rotation.y += planets[index].rotation
    })
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

loadData()
function loadData (){
    let result;
    // ========================================================================================================================================================================================
    let url ="https://docs.google.com/spreadsheets/d/e/2PACX-1vRe-NuXNEolTwg4iBlJtM4Lc7v8N-K8Be90s5mF0a0R6RUJP8NskA8PvxWMyAtOm_gjmaOoG_yA1w14/pub?gid=0&single=true&output=csv&range=k2"          
                  fetch(url) 
                  .then(response => response.text())
                  .then(text => { //what to do with result?
                   result = text; 
                   onComplete(result);
                }); 
                }

  function getAllData(allData)
        {   allData = allData.replace(/[""]+/g,'"'); //dont' know why data has extra ""  so remove them
        allData = allData.replace('"[{','[{'); //dont' know why data has extra ["  so remove them
        allData = allData.replace('}]"','}]'); 
        
            var myobje = JSON.parse(allData);
            console.log(myobje[1].Id);
            // myobje.map(x => console.log(x.Id)); to loop it through                     
            
        }              
       












