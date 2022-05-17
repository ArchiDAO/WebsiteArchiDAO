import css from "../styles/Home.module.css";
import { useLoader, useFrame,useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import Box from "./Boxx";
import OrbitControls from "./OrbitControls";
import LightBulb from "./LightBulb";
import Floor from "./Floor";
import Draggable from "./Draggable";
import {Suspense} from "react";
import Model from '../public/Archidao_wearable.js'
import React, {useState} from "react";
import { useMouse } from "rooks";
function MyRotatingBox() {
  const ref = React.useRef()

  const myMesh = React.useRef();
  const mouseLightMesh = React.useRef();

  const { viewport } = useThree();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [intensity, setIntensity] = useState(false);
  const { x, y } = useMouse();
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a*-.5;

    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    const x2 = (x / viewport.width);
    const y2 = (y / viewport.height);
    // console.log(docY)
    // console.log(posX)
    // console.log(elX)
    mouseLightMesh.current.position.set(x2*3-60, -(-y2*2.5+40), 6);
  });
  return (
    <>
    <mesh ref={myMesh} position={[-2, 0, 4]}>
    <Suspense fallback={null}>
      <Model position={[0, -1, 0]} />
    </Suspense>
    </mesh>
    <mesh ref={mouseLightMesh} position={[1,1,0]}>
      <pointLight castShadow color={"blue"} intensity={.5}  />
      <sphereBufferGeometry args={[0, 10, 10]} />
      <meshPhongMaterial emissive={"white"} />
    </mesh>
    <mesh ref={mouseLightMesh} position={[1,1,0]}>
      <pointLight castShadow color={"green"} intensity={.5}  />
      <sphereBufferGeometry args={[0, 10, 10]} />
      <meshPhongMaterial emissive={"white"} />
    </mesh>
    </>
  );
}
const light_info = [
  {position: [-20,0,0],color:'green',intensity:.5},
  {position: [-10,5,-10],color:'purple',intensity:.5},
  {position: [20,5,10],color:'blue',intensity:.5},
  {position: [0,10,10],color:'pink',intensity:.5},
]


export default function Canvas3() {
    return (
    <div className={css.scene}>
      <Canvas
        shadows={true}
        className={css.canvas}
        camera={{
          position: [2,6, 12],
        }}
      >
      {light_info.map((lightx) => (      <mesh  position={lightx.position}>
              <pointLight castShadow color={lightx.color} intensity={lightx.intensity}  />
              <sphereBufferGeometry args={[.0, 10, 10]} />
              <meshPhongMaterial emissive={"white"} />
            </mesh>))}


        <OrbitControls />

        <MyRotatingBox />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}
