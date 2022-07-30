import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { LoopOnce, TextureLoader } from 'three'
import gsap from 'gsap'
import * as THREE from 'three'

let interval;
let isFront;
let sceneRef 
let clickTextDesc = true;

let tabscreenMat;
let phonescreenMat;
let phonetexes;
let tabtexes;

const defClickText = "Click Me!"

export default function Face({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/Assets/3D/face.gltf')
  const { mixer, actions, clips, names, ref } = useAnimations(animations, group);
  const [clickText, changeClickText, clickRef] = useState("Click Me!")

  sceneRef = useRef(null);
  materials.wireframe.wireframe = true;
  materials.tabscreen.emissiveIntensity = 0.5;
  materials.phonescreen.emissiveIntensity = 0.5;
  materials.wireframe.emissiveIntensity = 0.5;
  materials.htmlin.emissiveIntensity = 3;
  materials.TYPOIN.emissiveIntensity = 2;

  tabscreenMat = materials.tabscreen
  phonescreenMat = materials.phonescreen

  phonetexes = [
    useLoader(TextureLoader, '/Assets/2D/chainet.png'),
    useLoader(TextureLoader, '/Assets/2D/vanend.png'),
    useLoader(TextureLoader, '/Assets/2D/vanstart.png'),
    useLoader(TextureLoader, '/Assets/2D/tab.png')
  ]
  tabtexes = [
    useLoader(TextureLoader, 'Assets/2D/acceloweb.jpg'),
    useLoader(TextureLoader, 'Assets/2D/acceloweb2.jpg'),
    useLoader(TextureLoader, 'Assets/2D/projection.jpg')
  ]
  
  useEffect(() => {
    isFront = true;
    changePhoneScreen()
    changeTabScreen();
    idleAnim(clips, actions)
  }, []);

  useEffect(() => {
    if(isFront === false){
    if(props.selState === '2D')
    {
      Moveto2D()
    }else if (props.selState === '3D'){
      Moveto3D()
    }else if(props.selState === 'Game'){
      MovetoGame()
    }
    }
  },[props.selState])

  useEffect(() => {
    if(clickTextDesc){
      
      if(clickText.length > 0){
        setTimeout(() => {
          changeClickText((prevVal) => prevVal.slice(0,-1))
        }, 200)
      }else{
        clickTextDesc = false;
        setTimeout(() => {
          changeClickText((prevVal) => prevVal + defClickText.slice(prevVal.length, prevVal.length+1))
        }, 2500)
      }
    }else{
      if(clickText.length < defClickText.length){
        setTimeout(() => {
          changeClickText((prevVal) => prevVal + defClickText.slice(prevVal.length, prevVal.length+1))
        }, 200)
      }else{
        clickTextDesc = true;
        setTimeout(() => {
          changeClickText((prevVal) => prevVal.slice(0,-1))
        }, 2500)
     }
    }
  }, [clickText])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" position = {[0,0,0]} rotation ={[0,0,0]} ref = {sceneRef} onClick = {() => Turn(actions)}>
        <group name="Armature" position={[0.4, -1.54, 0.36]}>
          <group name="base" rotation={[-Math.PI, 0, -Math.PI]}>
            <group name="Bone001" position={[0, 1, 0]} rotation={[-0.95, 0, Math.PI]} />
            <group name="jawUp" position={[0, 1, 0]} rotation={[-1.29, 0, Math.PI]} />
            <group name="upperLidL" position={[-0.44, 1.29, 1.2]} rotation={[-0.02, 0, 0]} />
            <group name="lowerLidL" position={[-0.45, 1.31, 1.06]} rotation={[0, 0, Math.PI]} />
            <group name="brow2L" position={[-0.48, 1.68, 1.2]} />
            <group name="brow1L" position={[-0.31, 1.61, 1.2]} />
            <group name="brow3L" position={[-0.61, 1.66, 1.2]} />
            <group name="lipEndL" position={[-0.32, 0.48, 1.2]} rotation={[0, 0, Math.PI]} />
            <group name="lipLowerL" position={[-0.18, 0.33, 1.26]} rotation={[0, 0, Math.PI]} />
            <group name="lipUpper1L" position={[-0.1, 0.63, 1.37]} />
            <group name="lipUpper2L" position={[-0.22, 0.55, 1.29]} />
            <group name="connectOutL" position={[0, 1, 0]} rotation={[0.11, 0.87, 1.43]}>
              <group name="outL" position={[0, 1.17, 0]} rotation={[-1.36, 0.22, 2.74]} />
              <group name="jawOutL" position={[0, 1.17, 0]} rotation={[-0.74, -0.52, 1.83]}>
                <group name="chinOutL" position={[0, 0.73, 0]} rotation={[1.25, 0.57, 0.56]} />
              </group>
              <group name="socketL" position={[0, 1.17, 0]} rotation={[-0.85, -0.04, -1.04]}>
                <group name="headOutL" position={[0, 0.37, 0]} rotation={[-0.13, 0.09, -0.85]}>
                  <group name="headOut2L" position={[0, 0.69, 0]} rotation={[0.54, -0.36, -0.68]}>
                    <group name="headOut3L" position={[0, 0.43, 0]} rotation={[-0.52, -0.47, -1.52]} />
                  </group>
                </group>
              </group>
            </group>
            <group name="upperLidR" position={[0.44, 1.41, 1.2]} />
            <group name="lowerLidR" position={[0.45, 1.21, 1.1]} rotation={[0, 0, Math.PI]} />
            <group name="brow2R" position={[0.48, 1.68, 1.2]} />
            <group name="brow1R" position={[0.31, 1.61, 1.2]} />
            <group name="brow3R" position={[0.61, 1.66, 1.2]} />
            <group name="lipEndR" position={[0.32, 0.48, 1.2]} rotation={[0, 0, Math.PI]} />
            <group name="lipLowerR" position={[0.18, 0.33, 1.26]} rotation={[0, 0, Math.PI]} />
            <group name="lipUpper1R" position={[0.1, 0.63, 1.37]} />
            <group name="lipUpper2R" position={[0.22, 0.55, 1.29]} />
            <group name="connectOutR" position={[0, 1, 0]} rotation={[0.11, -0.87, -1.43]}>
              <group name="outR" position={[0, 1.17, 0]} rotation={[-1.36, -0.22, -2.74]} />
              <group name="jawOutR" position={[0, 1.17, 0]} rotation={[-0.74, 0.52, -1.83]}>
                <group name="chinOutR" position={[0, 0.73, 0]} rotation={[1.25, -0.57, -0.56]} />
              </group>
              <group name="socketR" position={[0, 1.17, 0]} rotation={[-0.85, 0.04, 1.04]}>
                <group name="headOutR" position={[0, 0.37, 0]} rotation={[-0.13, -0.09, 0.85]}>
                  <group name="headOut2R" position={[0, 0.69, 0]} rotation={[0.54, 0.36, 0.68]}>
                    <group name="headOut3R" position={[0, 0.43, 0]} rotation={[-0.52, 0.47, 1.52]} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="Armature001">
          <primitive object={nodes.base_1} />
          <group name="ae" position={[0.05, 0.23, -0.01]} scale={0.73}>
            <mesh name="Cube010" geometry={nodes.Cube010.geometry} material={materials.aeback} />
            <mesh name="Cube010_1" geometry={nodes.Cube010_1.geometry} material={materials.aelight} />
          </group>
          <group name="ai" position={[0.05, 0.17, 0.01]} scale={0.63}>
            <mesh name="Cube009" geometry={nodes.Cube009.geometry} material={materials.aiBack} />
            <mesh name="Cube009_1" geometry={nodes.Cube009_1.geometry} material={materials.aiLight} />
          </group>
          <group name="arcrock1" position={[-0.19, 0.08, 0.05]} scale={1.21}>
            <mesh name="Cube018" geometry={nodes.Cube018.geometry} material={materials.arcusRock} />
            <mesh name="Cube018_1" geometry={nodes.Cube018_1.geometry} material={materials['wendigoleather.003']} />
            <mesh name="Cube018_2" geometry={nodes.Cube018_2.geometry} material={materials['wendigoskeletal.005']} />
            <mesh name="Cube018_3" geometry={nodes.Cube018_3.geometry} material={materials['wendigodarker.005']} />
            <mesh name="Cube018_4" geometry={nodes.Cube018_4.geometry} material={materials['wendigoskeletal.006']} />
            <mesh name="Cube018_5" geometry={nodes.Cube018_5.geometry} material={materials['wendigoleather.004']} />
            <mesh name="Cube018_6" geometry={nodes.Cube018_6.geometry} material={materials['wendigodarker.006']} />
            <mesh name="Cube018_7" geometry={nodes.Cube018_7.geometry} material={materials['wendigoglow.003']} />
            <mesh name="Cube018_8" geometry={nodes.Cube018_8.geometry} material={materials.htmlin} />
            <mesh name="Cube018_9" geometry={nodes.Cube018_9.geometry} material={materials.skin} />
            <mesh name="Cube018_10" geometry={nodes.Cube018_10.geometry} material={materials['fabsample.002']} />
            <mesh name="Cube018_11" geometry={nodes.Cube018_11.geometry} material={materials.red} />
            <mesh name="Cube018_12" geometry={nodes.Cube018_12.geometry} material={materials['fabsample.001']} />
            <mesh name="Cube018_13" geometry={nodes.Cube018_13.geometry} material={materials['fabsample.003']} />
            <mesh name="Cube018_14" geometry={nodes.Cube018_14.geometry} material={materials['fabsample.005']} />
            <mesh name="Cube018_15" geometry={nodes.Cube018_15.geometry} material={materials.kera} />
            <mesh name="Cube018_16" geometry={nodes.Cube018_16.geometry} material={materials['Material.005']} />
            <mesh name="Cube018_17" geometry={nodes.Cube018_17.geometry} material={materials['Material.003']} />
            <mesh name="Cube018_18" geometry={nodes.Cube018_18.geometry} material={materials['Material.006']} />
          </group>
          <group name="blender" position={[0.08, 0.19, -0.12]} scale={0.68}>
            <mesh name="Circle006" geometry={nodes.Circle006.geometry} material={materials.blenderorange} />
            <mesh name="Circle006_1" geometry={nodes.Circle006_1.geometry} material={materials.blenderblue} />
          </group>
          <group name="book" position={[-0.37, 0.66, 0.09]} rotation={[0, -0.08, 0]}>
            <mesh name="Cube006" geometry={nodes.Cube006.geometry} material={materials.bookpaper} />
            <mesh name="Cube006_1" geometry={nodes.Cube006_1.geometry} material={materials.OOUT} />
          </group>
          <group name="css" position={[0.07, 0.15, -0.1]} scale={0.62}>
            <mesh name="Cube017" geometry={nodes.Cube017.geometry} material={materials.htmlin} />
            <mesh name="Cube017_1" geometry={nodes.Cube017_1.geometry} material={materials.cssout} />
          </group>
          <mesh name="hand" geometry={nodes.hand.geometry} material={materials.wireframe} position={[-0.46, 0.07, -0.07]} rotation={[-0.03, 0.08, -0.44]} scale={0.72} />
          <group name="html" position={[0.07, 0.15, -0.1]} scale={0.56}>
            <mesh name="Cube013" geometry={nodes.Cube013.geometry} material={materials.htmlout} />
            <mesh name="Cube013_1" geometry={nodes.Cube013_1.geometry} material={materials.htmlin} />
          </group>
          <group name="js" position={[0.07, 0.15, -0.1]} scale={0.56}>
            <mesh name="Cube014" geometry={nodes.Cube014.geometry} material={materials.jsout} />
            <mesh name="Cube014_1" geometry={nodes.Cube014_1.geometry} material={materials.htmlin} />
          </group>
          <mesh name="NurbsPath026" geometry={nodes.NurbsPath026.geometry} material={materials.hair} />
          <mesh name="NurbsPath027" geometry={nodes.NurbsPath027.geometry} material={materials.hair} />
          <mesh name="NurbsPath028" geometry={nodes.NurbsPath028.geometry} material={materials.hair} />
          <mesh name="NurbsPath029" geometry={nodes.NurbsPath029.geometry} material={materials.hair} />
          <mesh name="NurbsPath030" geometry={nodes.NurbsPath030.geometry} material={materials.hair} />
          <mesh name="NurbsPath031" geometry={nodes.NurbsPath031.geometry} material={materials.hair} />
          <mesh name="NurbsPath032" geometry={nodes.NurbsPath032.geometry} material={materials.hair} />
          <mesh name="NurbsPath033" geometry={nodes.NurbsPath033.geometry} material={materials.hair} />
          <mesh name="NurbsPath034" geometry={nodes.NurbsPath034.geometry} material={materials.hair} />
          <mesh name="NurbsPath035" geometry={nodes.NurbsPath035.geometry} material={materials.hair} />
          <mesh name="NurbsPath036" geometry={nodes.NurbsPath036.geometry} material={materials.hair} />
          <mesh name="NurbsPath037" geometry={nodes.NurbsPath037.geometry} material={materials.hair} />
          <mesh name="NurbsPath038" geometry={nodes.NurbsPath038.geometry} material={materials.hair} />
          <mesh name="NurbsPath039" geometry={nodes.NurbsPath039.geometry} material={materials.hair} />
          <mesh name="NurbsPath040" geometry={nodes.NurbsPath040.geometry} material={materials.hair} />
          <mesh name="NurbsPath041" geometry={nodes.NurbsPath041.geometry} material={materials.hair} />
          <mesh name="NurbsPath042" geometry={nodes.NurbsPath042.geometry} material={materials.hair} />
          <mesh name="NurbsPath043" geometry={nodes.NurbsPath043.geometry} material={materials.hair} />
          <mesh name="NurbsPath044" geometry={nodes.NurbsPath044.geometry} material={materials.hair} />
          <mesh name="NurbsPath045" geometry={nodes.NurbsPath045.geometry} material={materials.hair} />
          <mesh name="NurbsPath046" geometry={nodes.NurbsPath046.geometry} material={materials['Material.004']} />
          <group name="o" position={[0, 0.12, -0.03]} scale={0.76}>
            <mesh name="Circle" geometry={nodes.Circle.geometry} material={materials.OOUT} />
            <mesh name="Circle_1" geometry={nodes.Circle_1.geometry} material={materials.TYPOIN} />
          </group>
          <group name="p" position={[0, 0.12, -0.03]} scale={0.76}>
            <mesh name="BezierCurve003" geometry={nodes.BezierCurve003.geometry} material={materials.POUT} />
            <mesh name="BezierCurve003_1" geometry={nodes.BezierCurve003_1.geometry} material={materials.TYPOIN} />
            <mesh name="BezierCurve003_2" geometry={nodes.BezierCurve003_2.geometry} material={materials.wireframe} />
          </group>
          <mesh name="Plane" geometry={nodes.Plane.geometry} material={materials.kitty} position={[0.07, -0.34, -0.17]} scale={0.62} />
          <mesh name="poster1001" geometry={nodes.poster1001.geometry} material={materials.poster1} position={[-0.05, 0.75, -0.45]} scale={0.5} />
          <mesh name="poster2001" geometry={nodes.poster2001.geometry} material={materials.poster2} position={[-0.17, 0.14, -0.28]} scale={0.77} />
          <mesh name="poster3001" geometry={nodes.poster3001.geometry} material={materials.poster3} position={[0.59, 0.37, -0.01]} scale={0.79} />
          <mesh name="rhino" geometry={nodes.rhino.geometry} material={nodes.rhino.material} position={[0, 0.07, -0.26]} scale={0.53} />
          <mesh name="screen" geometry={nodes.screen.geometry} material={materials.gunmetal} position={[-0.44, 0.8, 0.01]} rotation={[-0.06, -0.12, -0.23]} scale={0.84} />
          <mesh name="SCREENACTUAL" geometry={nodes.SCREENACTUAL.geometry} material={materials.bigscreen} position={[-0.44, 0.8, 0.01]} rotation={[-0.06, -0.12, -0.23]} scale={0.84} />
          <mesh name="shader1" geometry={nodes.shader1.geometry} material={materials.testmat} position={[-0.61, 0.13, -0.25]} scale={0.67} />
          <mesh name="shader2" geometry={nodes.shader2.geometry} material={materials.ShaderMat2} position={[0.03, 0.34, -0.2]} scale={0.82} />
          <group name="shrimpBody" position={[0.3, 0.26, 0.09]} rotation={[0.2, -0.05, 0.09]} scale={1.39}>
            <mesh name="mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a" geometry={nodes['mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a'].geometry} material={materials.shrimpglass} />
            <mesh name="mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_1" geometry={nodes['mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_1'].geometry} material={materials.shrimpMetal} />
            <mesh name="mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_2" geometry={nodes['mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_2'].geometry} material={materials.shrimpglass} />
            <mesh name="mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_3" geometry={nodes['mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_3'].geometry} material={materials.shrimpglass} />
            <mesh name="mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_4" geometry={nodes['mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_4'].geometry} material={materials.shrimpglass} />
            <mesh name="mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_5" geometry={nodes['mesh-a412e250-c2e1-42dc-8500-9fa5d9bdd08a_5'].geometry} material={materials.wireframe} />
          </group>
          <group name="shrimpGlass1" position={[0.3, 0.26, 0.09]} rotation={[0.2, -0.05, 0.09]} scale={1.39}>
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180001" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180001'].geometry} material={materials.shrimpglass} />
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180001_1" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180001_1'].geometry} material={materials.wireframe} />
          </group>
          <group name="shrimpMid" position={[0.3, 0.26, 0.09]} rotation={[0.2, -0.05, 0.09]} scale={1.39}>
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180003" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180003'].geometry} material={materials.shrimpglass} />
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180003_1" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180003_1'].geometry} material={materials.wireframe} />
          </group>
          <group name="shrimpWings" position={[0.3, 0.26, 0.09]} rotation={[0.2, -0.05, 0.09]} scale={1.39}>
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180002" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180002'].geometry} material={materials.wireframe} />
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180002_1" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180002_1'].geometry} material={materials.shrimpglass} />
          </group>
          <group name="shrimpWire" position={[0.3, 0.26, 0.09]} rotation={[0.2, -0.05, 0.09]} scale={1.39}>
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180'].geometry} material={materials.shrimpMetal} />
            <mesh name="mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180_1" geometry={nodes['mesh-bcf7aab7-4c6b-4979-b5eb-189aa1739180_1'].geometry} material={materials.wireframe} />
          </group>
          <group name="sperm2" position={[0.01, -0.12, 0.04]} scale={0.71}>
            <mesh name="Cone002" geometry={nodes.Cone002.geometry} material={materials.blenderorange} />
            <mesh name="Cone002_1" geometry={nodes.Cone002_1.geometry} material={materials.eggout} />
            <mesh name="Cone002_2" geometry={nodes.Cone002_2.geometry} material={materials.htmlin} />
            <mesh name="Cone002_3" geometry={nodes.Cone002_3.geometry} material={materials.TYPOIN} />
          </group>
          <group name="t" scale={0.84}>
            <mesh name="Plane_1" geometry={nodes.Plane_1.geometry} material={materials.TOUT} />
            <mesh name="Plane_2" geometry={nodes.Plane_2.geometry} material={materials.TYPOIN} />
          </group>
          <mesh name="tabbase" geometry={nodes.tabbase.geometry} material={materials.gunmetal} position={[-1.35, 0.84, 0.54]} rotation={[-0.03, 0.12, -1.55]} scale={1.84} />
          <mesh name="tabscreen" geometry={nodes.tabscreen.geometry} material={materials.tabscreen} position={[-1.35, 0.84, 0.54]} rotation={[-0.03, 0.12, -1.55]} scale={1.84} />
          <group name="unity" position={[-0.15, 0.09, -0.04]} scale={0.92}>
            <mesh name="Cube032" geometry={nodes.Cube032.geometry} material={materials.htmlin} />
            <mesh name="Cube032_1" geometry={nodes.Cube032_1.geometry} material={materials.gunmetal} />
          </group>
          <group name="unreal" position={[0.06, 0.03, -0.09]} scale={0.7}>
            <mesh name="BezierCurve007" geometry={nodes.BezierCurve007.geometry} material={materials.htmlin} />
            <mesh name="BezierCurve007_1" geometry={nodes.BezierCurve007_1.geometry} material={materials.gold} />
            <mesh name="BezierCurve007_2" geometry={nodes.BezierCurve007_2.geometry} material={materials['unrealblue.001']} />
          </group>
          <group name="y" position={[0, 0.12, -0.03]} scale={0.76}>
            <mesh name="BezierCurve" geometry={nodes.BezierCurve.geometry} material={materials.YOUT} />
            <mesh name="BezierCurve_1" geometry={nodes.BezierCurve_1.geometry} material={materials.TYPOIN} />
          </group>
          <skinnedMesh name="brow002" geometry={nodes.brow002.geometry} material={materials.hair} skeleton={nodes.brow002.skeleton} />
          <skinnedMesh name="EYEL" geometry={nodes.EYEL.geometry} material={materials['eye.R']} skeleton={nodes.EYEL.skeleton} />
          <skinnedMesh name="EYER" geometry={nodes.EYER.geometry} material={materials['eye.L']} skeleton={nodes.EYER.skeleton} />
          <group name="face003">
            <skinnedMesh name="Roundcube007" geometry={nodes.Roundcube007.geometry} material={materials.facemat} skeleton={nodes.Roundcube007.skeleton} />
            <Html scale={0.4} rotation={[ 0, 0, 0]} position={[0.7, 0.8, 2]} transform occlude>
              <div className="annotation">
              {clickText}
              </div>
            </Html>
            <skinnedMesh name="Roundcube007_1" geometry={nodes.Roundcube007_1.geometry} material={materials.facebackmatrev} skeleton={nodes.Roundcube007_1.skeleton} />
          </group>
          <skinnedMesh name="phonebase" geometry={nodes.phonebase.geometry} material={materials.gunmetal} skeleton={nodes.phonebase.skeleton} />
          <skinnedMesh name="phonescreen" geometry={nodes.phonescreen.geometry} material={materials.phonescreen} skeleton={nodes.phonescreen.skeleton} />
          <group name="ps">
            <skinnedMesh name="Cube008" geometry={nodes.Cube008.geometry} material={materials.psback} skeleton={nodes.Cube008.skeleton} />
            <skinnedMesh name="Cube008_1" geometry={nodes.Cube008_1.geometry} material={materials.psLight} skeleton={nodes.Cube008_1.skeleton} />
          </group>
        </group>
        <group name="Armature002" position={[0.4, -1.54, 0.36]} rotation={[0, Math.PI / 2, 0]}>
          <group name="base_2" rotation={[0, -1.57, 0]}>
            <group name="Bone_1" position={[0, 1, 0]} rotation={[0.95, 0, Math.PI]} />
            <group name="jawUp_2" position={[0, 1, 0]} rotation={[1.29, 0, Math.PI]} />
            <group name="upperLidL_2" position={[0.44, 1.41, -1.2]} />
            <group name="lowerLidL_2" position={[0.45, 1.21, -1.1]} rotation={[0, 0, -Math.PI]} />
            <group name="brow2L_2" position={[0.48, 1.68, -1.2]} />
            <group name="brow1L_2" position={[0.31, 1.61, -1.2]} />
            <group name="brow3L_2" position={[0.61, 1.66, -1.2]} />
            <group name="lipEndL_2" position={[0.32, 0.48, -1.2]} rotation={[0, 0, -Math.PI]} />
            <group name="lipLowerL_2" position={[0.18, 0.33, -1.26]} rotation={[0, 0, -Math.PI]} />
            <group name="lipUpper1L_2" position={[0.1, 0.63, -1.37]} />
            <group name="lipUpper2L_2" position={[0.22, 0.55, -1.29]} />
            <group name="connectOutL_2" position={[0, 1, 0]} rotation={[-0.11, 0.87, -1.43]}>
              <group name="outL_2" position={[0, 1.17, 0]} rotation={[1.36, 0.22, -2.74]} />
              <group name="jawOutL_2" position={[0, 1.17, 0]} rotation={[0.74, -0.52, -1.83]}>
                <group name="chinOutL_2" position={[0, 0.73, 0]} rotation={[-1.25, 0.57, -0.56]} />
              </group>
              <group name="socketL_2" position={[0, 1.17, 0]} rotation={[0.85, -0.04, 1.04]}>
                <group name="headOutL_2" position={[0, 0.37, 0]} rotation={[0.13, 0.09, 0.85]}>
                  <group name="headOut2L_2" position={[0, 0.69, 0]} rotation={[-0.54, -0.36, 0.68]}>
                    <group name="headOut3L_2" position={[0, 0.43, 0]} rotation={[0.52, -0.47, 1.52]} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

function idleAnim(clips, actions){
  if(isFront === true){
    const val = Math.floor(Math.random() * 10);
    if(val === 1){
      actions.fly1.reset();
      actions.fly1.setLoop(LoopOnce);
      actions.fly1.play();
      interval = Math.floor(clips[7].duration * 1000)
    }else if (val === 2)
    {
      actions.fly2.reset();
      actions.fly2.setLoop(LoopOnce);
      actions.fly2.play();
      interval = Math.floor(clips[8].duration * 1000)
    }else if (val === 3)
    {
      actions.sleep.reset();
      actions.sleep.setLoop(LoopOnce);
      actions.sleep.play();
      interval = Math.floor(clips[9].duration * 1000)
    }else
    {
      actions.Blink.reset();
      actions.Blink.setLoop(LoopOnce);
      actions.Blink.play();
      interval = Math.floor(clips[2].duration * 1000)
    }
    setTimeout(() => {
      idleAnim(clips, actions)
  }, interval + 2500);
  }
}
function Turn(actions){
  isFront = false;
  const val = Math.floor(Math.random() * 4);
  if(val === 1){
    actions.express1.reset();
    actions.express1.setLoop(LoopOnce);
    actions.express1.play();
    actions.express1.clampWhenFinished = true;
  }else if (val === 2)
  {
    actions.express2.reset();
    actions.express2.setLoop(LoopOnce);
    actions.express2.play();
    actions.express2.clampWhenFinished = true;

  }else if (val === 3)
  {
    actions.express3.reset();
    actions.express3.setLoop(LoopOnce);
    actions.express3.play();
    actions.express3.clampWhenFinished = true;
  }else
  {
    actions.express4.reset();
    actions.express4.setLoop(LoopOnce);
    actions.express4.play();
    actions.express4.clampWhenFinished = true;
  }
  setTimeout(() => {
    ActualTurn()
  }, 1500);
}
function ActualTurn(){
  gsap.to(sceneRef.current.rotation, {
    y: 3,
    duration: 1
  })
}
function Moveto2D()
{
  gsap.to(sceneRef.current.rotation, {
    x: 0.2,
    y:3,
    z:0.4,
    duration: 1
  })
  gsap.to(sceneRef.current.position, {
    x:0,
    y:-0.45,
    z:1.5,
    duration: 1
  })
  
}
function Moveto3D()
{
  gsap.to(sceneRef.current.rotation, {
    x:0.2,
    y:2.8,
    z:-0.3,
    duration: 1
  })
  gsap.to(sceneRef.current.position, {
    x:-0.15,
    y:-0.45,
    z:1.5,
    duration: 1
  })
}
function MovetoGame()
{
  gsap.to(sceneRef.current.rotation, {
    x: 0.5,
    y:3.3,
    z:0.1,
    duration: 1
  })
  gsap.to(sceneRef.current.position, {
    x:0,
    y:0.45,
    z:1.5,
    duration: 1
  })
}

function changePhoneScreen(){
  var textochangeto = phonetexes[Math.floor(Math.random() * phonetexes.length)];
  phonescreenMat.map = textochangeto;
  phonescreenMat.emissiveMap = textochangeto;
  setTimeout(changePhoneScreen, 1000);
}

function changeTabScreen(){
  var textochangeto = tabtexes[Math.floor(Math.random() * tabtexes.length)];
  tabscreenMat.map = textochangeto;
  tabscreenMat.emissiveMap = textochangeto;
  setTimeout(changeTabScreen, 1500);
}
useGLTF.preload('/Assets/3D/face.gltf')
