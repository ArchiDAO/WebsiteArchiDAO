import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Box from './Box'

const Boxes = () => {
  return (
      <Canvas camera={{ position: [0, 0, 35] }}>
       <fog attach="fog" args={['#505050', 0, 100]} />
        <ambientLight intensity={7} />
        <pointLight position={[40, 40, 40]} />
        <Box position={[10, 0, 0]} />

        <OrbitControls />
      </Canvas>
  )
}

export default Boxes
