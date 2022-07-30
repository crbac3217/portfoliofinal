import React, { Suspense, useState } from "react";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Canvas} from "@react-three/fiber";
import { Html} from '@react-three/drei'
import Face from '../components/Face.js'

const MainScreen = () => {
    const [selectedState, changeSelectedState] = useState('');
    function Hover2D(){
        changeSelectedState("2D");
    }
    function Hover3D(){
        changeSelectedState("3D");
    }
    function HoverGame(){
        changeSelectedState("Game");
    }
    
return(
    <div style={{height : "100vh" , width : "100vw"}}>
    <Canvas>
        <color attach="background" args={["#4D7C8A"]} />
        <fog color="#161616" attach="fog" near={3} far={30} />
        <Suspense fallback={<Fallback />}>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 10, 10]} intensity = {0.6} />
            <Face selState={selectedState} />
        </Suspense>
        <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.5} darkness={0.25} />
      </EffectComposer>
      <Html fullscreen>
      <nav className="navbar-dark bg-dark bg-opacity-75 navbar-expand rounded w-50 mx-auto mainNavbar">
        <ul className="navbar-nav mainNavList d-flex justify-content-around">
        
                <li className="nav-item"><a className = "bg-transparent border-0 text-left lead mainNavAnchor" href="/2D" onMouseEnter={Hover2D} ><strong>2D</strong></a></li>
                <li className="nav-item"><a className = "bg-transparent border-0 text-left lead mainNavAnchor" href="/3D" onMouseEnter={Hover3D} ><strong>3D</strong></a></li>
                <li className="nav-item"><a className = "bg-transparent border-0 text-left lead mainNavAnchor" href="/Game" onMouseEnter={HoverGame} ><strong>Game</strong></a></li>
            </ul> 
        </nav>     
      </Html>
      
      </Canvas>
    </div>
)
}

const Fallback = () => {
    return(
    <Html position={[-0.7, 0.8, 0]}>
    <div className="loading center"><h1 className="loading">Loading... </h1> </div>
    </Html>
    )    
}

export default MainScreen;