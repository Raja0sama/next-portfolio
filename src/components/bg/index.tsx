import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import theme from "../../theme";

interface SphereTypes {
  rotateX: any;
  rotateY: any;
  color: string;
}

interface refTypes {
  current: any;
}

const Sphere = ({ rotateX, rotateY, color = theme.textColor }: SphereTypes) => {
  const ref: refTypes = useRef();
  const _window: any = window;

  useFrame(() => {
    if (rotateX)
      if (ref.current.rotation) {
        ref.current.rotation.x = ref.current.rotation.x += rotateX;
      }

    if (rotateY)
      if (ref.current.rotation) {
        ref.current.rotation.y = ref.current.rotation.y += rotateY;
      }
  });

  useEffect(() => {
    _window.a = ref.current;
  }, []);

  return (
    <group ref={ref}>
      <points>
        <sphereGeometry args={[4, 60, 60]} />
        <pointsMaterial size={0.009} color={color} sizeAttenuation />
      </points>
    </group>
  );
};

interface SphereComponent {
  color: string;
}
export default function SphereComponent({ color }: SphereComponent) {
  const [_window, setWindow]: any = useState();
  useEffect(() => {
    setWindow(window);
  }, []);

  const sizes: any = {
    width: _window?.innerWidth,
    height: _window?.innerHeight,
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        {/* <gridHelper /> */}
        <perspectiveCamera
          fov={75}
          aspect={sizes.width / sizes.height}
          position={[0, -5, 4]}
          near={0.1}
          far={50}
        >
          <Sphere color={color} rotateX={0.005} rotateY={0.005} />
          {/* <Sphere rotateY={-0.005} /> */}
        </perspectiveCamera>
        {/* <Controls /> */}
      </Canvas>
    </div>
  );
}
