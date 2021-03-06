import "./App.css";
import "./ChatCss.css";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, Color3 } from "@babylonjs/core";
import { useState, useEffect } from "react";
// import SceneComponent from "./SceneComponent";
import "@babylonjs/loaders";

import axios from "axios";
import { Display3D } from "./components/Display3D";
import { MapDisplayer } from "./components/2d/MapDisplayer";
const chatUrl = "https://9718-3-113-24-30.ngrok.io/chat";
const nickname = `CRYPTO FUNK MANIAC - ${parseInt(Math.random() * 10000)}`;
let box;
const gltfPath = "https://storage.opensea.io/files/e085da0987a623f329d9587723a12b8d.gltf";

// const onSceneReady = (scene) => {
//   // This creates and positions a free camera (non-mesh)
//   var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

//   // This targets the camera to scene origin
//   camera.setTarget(Vector3.Zero());

//   const canvas = scene.getEngine().getRenderingCanvas();

//   // This attaches the camera to the canvas
//   camera.attachControl(canvas, true);

//   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//   var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

//   // Default intensity is 1. Let's dim the light a small amount
//   light.intensity = 0.7;

//   // Our built-in 'box' shape.
//   box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

//   // Move the box upward 1/2 its height
//   box.position.y = 1;

//   // Add gltf
//   // https://storage.opensea.io/files/e085da0987a623f329d9587723a12b8d.gltf

//   // BABYLON.SceneLoader.Append("./", "duck.gltf", scene, function (scene) {
//   //   // do something with the scene
//   // });

//   SceneLoader.Append(gltfPath, '',  scene, (scene) => {
//     console.log('success');
//   });
//   // SceneLoader.Append('https://storage.opensea.io/files/e085da0987a623f329d9587723a12b8d.gltf', scene, (scene) => {
//   //   console.log('success');
//   // });

//   // Our built-in 'ground' shape.
//   MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
// };

// const onRender = (scene) => {
//   if (box !== undefined) {
//     var deltaTimeInMillis = scene.getEngine().getDeltaTime();

//     const rpm = 10;
//     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
//   }
// };

const M = 100000;
function App() {
  const [NFTUrls, setNFTUrls] = useState([gltfPath, "https://storage.opensea.io/files/d3869b058e297fa014862a254fcccf02.gltf", "https://storage.opensea.io/files/abb866f89bfb78f2cc7dd52406027e10.gltf"]);
  const [textValue, setTextValue] = useState("");
  const [chatSecond, setChatSecond] = useState(M);
  const [chatHistory, setChatHistory] = useState([{ nickname: "MASTER", content: "HELLO" }]);
  const [assetSwitch, setAssetSwitch] = useState(false);
  useEffect(() => {
    axios.get(chatUrl).then((value) => {
      setChatHistory(value.data);
      // value.data
    });
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
      <button onClick={()=>{setAssetSwitch(!assetSwitch)}} style={{position:'absolute', marginTop:'20px', marginLeft:'20px'}}>SWITCH</button>
      
      <div style={{height: "100px"}}>
        {/* <Display3D NFTUrls={NFTUrls} /> */}
        { assetSwitch ?<MapDisplayer /> : <Display3D NFTUrls={NFTUrls} />}
        
      </div>
      
      <div class="chat">
        <div class="chat-title">
          <h1>{nickname}</h1>
          <h2>Level 2</h2>
          <figure class="avatar">
            <img src="https://lh3.googleusercontent.com/Zau-70Ga57u021g4xxx9UqHyiwwpxuFI-W1q0BWetxhmhm8_rTERCPsCfQled_nxBDIN40U7x1hDX3CvVkMeLe4Pxg=w600" />
          </figure>
        </div>
        <div class="messages">
          {chatHistory.map((c, index) => {
            if (nickname === c.nickname) {
              return <div class="message message-personal">{c.content}</div>;
            } else {
              return (
                <div class="message new">
                  {c.nickname}: {c.content}
                </div>
              );
            }
            
          })}
          
        </div>
        <div class="message-box">
          <textarea type="text" class="message-input" placeholder="Type message..." value={textValue} onChange={(event) => setTextValue(event.target.value)}></textarea>
          <button
            type="submit"
            class="message-submit"
            onClick={() => {
              axios
                .post(chatUrl, {
                  nickname: nickname,
                  content: textValue,
                  timestamp: 0,
                })
                .then(() => {
                  setTextValue("");
                });
            }}
          >
            Send
          </button>
        </div>
      </div>
      <div class="bg"></div>
    </div>
  );
}

export default App;

// return <div class="messages-content">{c.nickname}: {c.content}</div>

{/* <div class="messages-content">A: B</div> */}
          {/* <div class="message new">ASSD: Bsdfsd</div> */}