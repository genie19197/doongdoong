import logo from './logo.svg';
import './App.css';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, Color3 } from "@babylonjs/core";
import { useState} from 'react';
import SceneComponent from "./SceneComponent";
import { Engine, Scene } from 'react-babylonjs'
// import 'babylonjs-loaders';
import '@babylonjs/loaders';
import ScaledModelWithProgress from './ScaledModelWithProgress';
let box;
const gltfPath = 'https://storage.opensea.io/files/e085da0987a623f329d9587723a12b8d.gltf';

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Add gltf
  // https://storage.opensea.io/files/e085da0987a623f329d9587723a12b8d.gltf

  // BABYLON.SceneLoader.Append("./", "duck.gltf", scene, function (scene) {
  //   // do something with the scene
  // });
  
  SceneLoader.Append(gltfPath, '',  scene, (scene) => {
    console.log('success');
  });
  // SceneLoader.Append('https://storage.opensea.io/files/e085da0987a623f329d9587723a12b8d.gltf', scene, (scene) => {
  //   console.log('success');
  // });
  

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};



function App() {
  const [NFTUrls, setNFTUrls] = useState([gltfPath, 'https://storage.opensea.io/files/d3869b058e297fa014862a254fcccf02.gltf', 'https://storage.opensea.io/files/abb866f89bfb78f2cc7dd52406027e10.gltf']);
  return (
    <div>
      <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
      {/* <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" /> */}
      

          <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
            <Scene>
              <arcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
              <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              {/* <ScaledModelWithProgress rootUrl={`https://storage.opensea.io/files/`} sceneFilename="e085da0987a623f329d9587723a12b8d.gltf" scaleTo={1} 
                progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(-2.5, 0, 0)}
              /> */}
              {
                NFTUrls.map((url, index) => {
                  const separatorIndex = url.lastIndexOf('/');
                  const rootUrl = url.slice(0,separatorIndex + 1); // get until last '/'
                  const filename = url.slice(separatorIndex + 1);
                  return <ScaledModelWithProgress rootUrl={rootUrl} sceneFilename={filename} scaleTo={1} 
progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(index, index , 0)}
              />;
                  
                })
              }
              
            </Scene>
          </Engine>
      {/* <input /> */}
      {/* <button onClick={()=>{}}>SHOW</button> */}
    </div>
  );
}

export default App;
