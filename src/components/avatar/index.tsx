import * as THREE from "three";

import { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import Model from "./model";
import { Vector2 } from "three";

export default function M() {
  const [_window, setWindow]: any = useState({});
  useEffect(() => {
    setWindow(window);
  }, []);

  const [position, setposition] = useState([0, 0, 0]);
  useEffect(() => {
    setInterval((e: any) => setposition([0, -1, 0]), 1000);
  }, []);

  useEffect(() => {
    _window.model = (e: any) => setposition(e);
  }, []);

  const spotLightProps: any = {
    shadowBias: -0.0001,
    color: "0xffa95c",
    intensity: 1,
    castShadow: true,
    shadow: {
      mapSize: {
        width: 1024 * 4,
        height: 1024 * 4,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ReinhardToneMapping;
          gl.toneMappingExposure = 2;
        }}
        dpr={_window.devicePixelRatio}
        camera={{
          position: [0, 1, 4],
          fov: 38,
          near: 1,
          far: -50000,
          rotation: [-0.02, 0, 0],
        }}
      >
        <Suspense fallback={<>Loading</>}>
          <Model />
        </Suspense>
        {/* <OrbitControls position={[0, -1, 0]} /> */}
        <directionalLight
          castShadow
          position={[50, 20, 80]}
          intensity={0.5}
          shadow-mapSize-shadowMapWidth={2048}
          shadow-mapSize-shadowMapHeight={2048}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={-50}
          shadow-camera-bottom={10}
        />
        {/* <axesHelper /> */}
        <pointLight position={[10, -10, -20]} intensity={0.3} />
        <pointLight position={[0, 10, 5]} intensity={0.3} />
        <hemisphereLight
          intensity={0.4}
          groundColor={0x080820}
          color={0xffeeb1}
        />
        {/* <ambientLight /> */}
        <spotLight {...spotLightProps} />
      </Canvas>
    </div>
  );
}
