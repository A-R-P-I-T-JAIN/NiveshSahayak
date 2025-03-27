import React, { useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three"; // Import animations

export default function Model({ anim }) {
  
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/piggy.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
      if (actions) {
        Object.values(actions).forEach((action) => action.play()); // Play all animations
        console.log(nodes);
      }
    }, [actions]);
  const [hovered, setHovered] = useState(false);
  const { position, rotation } = useSpring({
    position: hovered ? [-1, -1.572, -0.017] : [0, -1.472, -0.017],
    rotation: hovered ? [0, 0, -1.908] : [0, 0, -0.408],
    config: { mass: 1, tension: 170, friction: 26 }, // Adjust for smoother effect
  });
  return (
    <group
      ref={group}
      position={[anim.x, anim.y, anim.z]}
      rotation={[anim.rx, anim.ry, anim.rz]}
      // position={[0,0,0]}
      // rotation={[0,0,0]}
      scale={anim.s}
      // scale={2}
      dispose={null}
      onPointerOver={() => setHovered(true)}  // Hover starts animation
      onPointerOut={() => setHovered(false)} // Hover ends animation
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Icosphere_9"
                position={[0, 0.214, 0.711]}
                scale={0.076}
              >
                <mesh
                  name="Object_32"
                  geometry={nodes.Object_32.geometry}
                  material={materials["black.001"]}
                />
              </group>
              <group
                name="Circle_0"
                position={[-0.442, -0.04, 0.756]}
                rotation={[Math.PI / 2, 0, 0.379]}
                scale={[0.149, 0.149, 0.068]}
              >
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group name="Cube001_1">
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials["brown.002"]}
                />
                <mesh
                  name="Object_7"
                  geometry={nodes.Object_7.geometry}
                  material={materials["outline.dog.001"]}
                />
              </group>
              <group name="Cube002_2" position={[0, -1.215, 0]}>
                <mesh
                  name="Object_9"
                  geometry={nodes.Object_9.geometry}
                  material={materials["brown.002"]}
                />
                <mesh
                  name="Object_10"
                  geometry={nodes.Object_10.geometry}
                  material={materials["outline.001"]}
                />
              </group>
              <group
                name="Cube003_3"
                position={[-0.333, -2.264, 0.03]}
                scale={[0.219, 0.486, 0.219]}
              >
                <mesh
                  name="Object_12"
                  geometry={nodes.Object_12.geometry}
                  material={materials["brown.002"]}
                />
                <mesh
                  name="Object_13"
                  geometry={nodes.Object_13.geometry}
                  material={materials["outline.dog.001"]}
                />
              </group>
              <a.group 
                name="Cube004_4"
                position={position}
                rotation={rotation}
                scale={[0.255, 0.665, 0.507]}
              >
                <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials["brown.002"]} />
                <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials["outline.dog.001"]} />
              </a.group>
              <group
                name="Cube005_5"
                position={[0, -0.052, 0.702]}
                scale={[0.195, 0.144, 0.195]}
              >
                <mesh
                  name="Object_18"
                  geometry={nodes.Object_18.geometry}
                  material={materials["brown.001"]}
                />
                <mesh
                  name="Object_19"
                  geometry={nodes.Object_19.geometry}
                  material={materials["outline.dog.001"]}
                />
                <mesh
                  name="Object_20"
                  geometry={nodes.Object_20.geometry}
                  material={materials["black.002"]}
                />
              </group>
              <group name="Cube006_6" position={[0, -1.554, -0.032]}>
                <mesh
                  name="Object_22"
                  geometry={nodes.Object_22.geometry}
                  material={materials["blue.001"]}
                />
                <mesh
                  name="Object_23"
                  geometry={nodes.Object_23.geometry}
                  material={materials["outline.001"]}
                />
              </group>
              <group
                name="Cube007_7"
                position={[-0.697, 0.669, 0]}
                rotation={[0, 0, 0.751]}
                scale={[0.544, 0.487, 0.487]}
              >
                <mesh
                  name="Object_25"
                  geometry={nodes.Object_25.geometry}
                  material={materials["brown.002"]}
                />
                <mesh
                  name="Object_26"
                  geometry={nodes.Object_26.geometry}
                  material={materials["outline.dog.001"]}
                />
                <mesh
                  name="Object_27"
                  geometry={nodes.Object_27.geometry}
                  material={materials["brown.001"]}
                />
              </group>
              <group
                name="Cube008_8"
                position={[0, -1.472, -0.017]}
                rotation={[0, 0, -0.408]}
                scale={[0.255, 0.665, 0.507]}
              >
                <mesh
                  name="Object_29"
                  geometry={nodes.Object_29.geometry}
                  material={materials["brown.002"]}
                />
                <mesh
                  name="Object_30"
                  geometry={nodes.Object_30.geometry}
                  material={materials["outline.dog.001"]}
                />
              </group>
              <group name="Spiral002_11" position={[0, -1.626, -0.907]}>
                <mesh
                  name="Object_34"
                  geometry={nodes.Object_34.geometry}
                  material={materials["brown.001"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/piggy.glb");
