import css from "../styles/Home.module.css";
import { useLoader, useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import Box from "./Boxx";
import OrbitControls from "./OrbitControls";
import LightBulb from "./LightBulb";
import Floor from "./Floor";
import Draggable from "./Draggable";
import {Suspense} from "react";
import Test from '../public/Test.js'
import React from "react";

function MyRotatingBox() {
  const myMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a*1;
  });

  return (
    <mesh ref={myMesh}>
    <Suspense fallback={null}>
      <Test/>
    </Suspense>
    </mesh>
  );
}

export default function Canvas3() {
    return (
    <div className={css.scene}>
      <Canvas
        shadows={true}
        className={css.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >

      <mesh  position={[0, 3, 0]}>
        <pointLight castShadow color={"red"} intensity={0.21}  />
        <sphereBufferGeometry args={[.0, 10, 10]} />
        <meshPhongMaterial emissive={"white"} />
      </mesh>
      <mesh  position={[3, 6, 3]}>
        <pointLight castShadow color={"blue"} intensity={0.21}  />
        <sphereBufferGeometry args={[.0, 10, 10]} />
        <meshPhongMaterial emissive={"white"} />
      </mesh>
      <mesh  position={[1,1,1]}>
        <pointLight castShadow color={"white"} intensity={0.1}  />
        <sphereBufferGeometry args={[.0, 10, 10]} />
        <meshPhongMaterial emissive={"white"} />
      </mesh>
      <mesh  position={[6, 9, 6]}>
        <pointLight castShadow color={"purple"} intensity={0.31}  />
        <sphereBufferGeometry args={[.0, 10, 10]} />
        <meshPhongMaterial emissive={"white"} />
      </mesh>

        <OrbitControls />

        <MyRotatingBox />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}
