import './App.css';
import './ChatCss.css';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, Color3 } from "@babylonjs/core";
import { useState, useEffect } from 'react';
import SceneComponent from "./SceneComponent";
import { Engine, Scene } from 'react-babylonjs'
// import 'babylonjs-loaders';
import '@babylonjs/loaders';
import ScaledModelWithProgress from './ScaledModelWithProgress';

import axios from 'axios';
const chatUrl = 'http://3.113.24.30:3000/chat';
const nickname = `CRYPTO FUNK MANIAC - ${parseInt(Math.random()*10000)}`
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



const M = 100000;
function App() {
  const [NFTUrls, setNFTUrls] = useState([gltfPath, 'https://storage.opensea.io/files/d3869b058e297fa014862a254fcccf02.gltf', 'https://storage.opensea.io/files/abb866f89bfb78f2cc7dd52406027e10.gltf']);
  const [minutes, setMinutes] = useState(M);
  const [seconds, setSeconds] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [chatSecond, setChatSecond] = useState(M);
  const [chatHistory, setChatHistory] = useState([{nickname: 'MASTER', content:'HELLO'}]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(600);
        }
      }
    }, 10);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  useEffect(() => {
    
      axios.get(chatUrl).then((value) => {
        setChatHistory(value.data);
        // value.data
      })
    const countdown = setInterval(() => {
      if (parseInt(chatSecond) > 0) {
        setChatSecond(parseInt(chatSecond) - 1);
      }
      if (parseInt(chatSecond) === 0) {
        setChatSecond(M);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [chatSecond]);
  
  return (
    <div>
      <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
      {/* <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" /> */}
      <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
            <Scene>
              <arcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
              <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              {
                NFTUrls.map((url, index) => {
                  const separatorIndex = url.lastIndexOf('/');
                  const rootUrl = url.slice(0,separatorIndex + 1); // get until last '/'
                  const filename = url.slice(separatorIndex + 1);
                  const x = -2 + index + seconds * 0.005;
                  const y = index; //+ seconds * 0.005;
                  const z = seconds * 0.005;
                  return <ScaledModelWithProgress rootUrl={rootUrl} sceneFilename={filename} scaleTo={1} 
                          progressBarColor={Color3.FromInts(255, 165, 0)} 
                          center={new Vector3(x,  y, z)}
              />;
                })
              }
              
            </Scene>
          </Engine>
      <div class="chat">
  <div class="chat-title">
    <h1>{nickname}</h1>
    <h2>Level 2</h2>
    <figure class="avatar">
      <img src="https://lh3.googleusercontent.com/Zau-70Ga57u021g4xxx9UqHyiwwpxuFI-W1q0BWetxhmhm8_rTERCPsCfQled_nxBDIN40U7x1hDX3CvVkMeLe4Pxg=w600" /></figure>
      
  </div>
  <div class="messages">
    {
      chatHistory.map((c, index) => {
        if (nickname === c.nickname) {
          return <div class="message message-personal">{c.content}</div>
        } else {
          return <div class="message new">{c.nickname}: {c.content}</div>
        }
        // return <div class="messages-content">{c.nickname}: {c.content}</div>
      })
    }
    {/* <div class="messages-content">A: B</div> */}
    
    {/* <div class="message new">ASSD: Bsdfsd</div> */}
    
  </div>
  <div class="message-box">
    <textarea type="text" class="message-input" placeholder="Type message..." value={textValue} onChange={(event)=> setTextValue(event.target.value)}></textarea>
    <button type="submit" class="message-submit" onClick={()=>{
      axios.post(chatUrl, {
        nickname:nickname, 
        content: textValue,
        timestamp: 0
      }).then(()=>{
        setTextValue('');
      })

    }}>Send</button>
  </div>

</div>
<div class="bg"></div>
    </div>
  );
}

export default App;
