import React, {useRef} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const Box = () => {
    const boxRef = useRef();
  
    useFrame(() => {
      boxRef.current.rotation.y += 0.01;
    });
  
    return (
      <mesh ref={boxRef} rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"#3A3D34"}/>
      </mesh>
    );
  };

const Title3D = () => {
    return(
        <div className="fullvisual">
        <Canvas>
        <pointLight position={[5, 5, 5]} />
        <Html>
        <div className="title3D notosans bold">3D</div>
        </Html>
        <Box />
        </Canvas>
        </div>
    )
}

export default Title3D