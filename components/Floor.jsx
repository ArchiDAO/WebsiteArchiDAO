//components/Floor.jsx

import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveShadow={true}>
      <boxBufferGeometry args={[20000,.1,10000]} />
      <meshPhysicalMaterial color='white' />
    </mesh>
  );
}

export default Floor;
