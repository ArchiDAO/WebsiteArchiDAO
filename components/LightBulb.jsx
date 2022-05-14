import React from "react";

function LightBulb(props) {
  return (
    <mesh {...props} >
      <pointLight castShadow color={"red"} intensity={0.1}  />
      <sphereBufferGeometry args={[.0, 10, 10]} />
      <meshPhongMaterial emissive={"white"} />
    </mesh>
  );
}

export default LightBulb;
