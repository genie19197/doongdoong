import { useState, useEffect } from 'react';
import { Engine, Scene } from 'react-babylonjs'
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, Color3 } from "@babylonjs/core";
import ScaledModelWithProgress from './ScaledModelWithProgress';

const M = 100000;

export const Display3D = ({NFTUrls}) => {
    const [minutes, setMinutes] = useState(M);
    const [seconds, setSeconds] = useState(0);
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
    return (
        <div>
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
        </div>
    );
}