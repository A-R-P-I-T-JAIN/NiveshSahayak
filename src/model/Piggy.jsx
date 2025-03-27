import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/piggy-transformed.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play()); // Play all animations
      console.log(nodes);
    }
  }, [actions]);

  return (
    <group
      ref={group}
      {...props}
      // position={[4, 1, -1]}
      position={[0,0,0]}
      // rotation={[0, -0.55, 0]}
      rotation={[0,0,0]}
      scale={1.5}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group name="GLTF_SceneRootNode">
          <group name="Icosphere_9" position={[0, 0.214, 0.711]} scale={0.076}>
            <mesh
              name="Object_32"
              geometry={nodes.Object_32.geometry}
              material={materials.PaletteMaterial001}
            />
          </group>
        </group>
        <mesh
          name="Object_4"
          geometry={nodes.Object_4.geometry}
          material={materials.PaletteMaterial001}
          position={[-0.442, -0.04, 0.756]}
          rotation={[Math.PI / 2, 0, 0.379]}
          scale={[0.149, 0.149, 0.068]}
        />
        <mesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial002}
          rotation={[0, Math.PI/2, 0]}
        />
        <mesh
          name="Object_22"
          geometry={nodes.Object_22.geometry}
          material={materials["blue.001"]}
          position={[0, -1.554, -0.032]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/piggy-transformed.glb");
