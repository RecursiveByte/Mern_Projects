

import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Robot = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/robot.glb')
  const { actions ,names} = useAnimations(animations, group)

  useEffect(() => {
    
    if (names.length > 0) {
      const firstAnimation = names[0];
      actions[firstAnimation].reset().play();
      console.log(`Playing animation: ${firstAnimation}`);
    }
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.36}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="skeletom_4" position={[0.78, -0.015, -0.222]}>
                <group name="body_0" position={[-0.78, 0.015, 0.222]}>
                  <mesh
                    name="Object_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.body}
                  />
                  <mesh
                    name="Object_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.body}
                  />
                  <mesh
                    name="Object_7"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.body}
                  />
                  <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.line}
                  />
                </group>
                <group name="Cylinder002_1" position={[-0.78, 1.086, 0.222]}>
                  <mesh
                    name="Object_10"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_10.geometry}
                    material={materials.baseHead}
                  />
                </group>
                <group name="Cylinder003_2" position={[-0.751, 1.097, 0.222]}>
                  <mesh
                    name="Object_12"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_12.geometry}
                    material={materials.baseHead}
                  />
                </group>
                <group name="Cylinder004_3" position={[-0.81, 1.104, 0.221]}>
                  <mesh
                    name="Object_14"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_14.geometry}
                    material={materials.baseHead}
                  />
                </group>
              </group>
              <group name="eye_6" position={[0.816, 0, -0.176]}>
                <mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials.material}
                />
                <mesh
                  name="Object_17"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_17.geometry}
                  material={materials.eyeCenter}
                />
              </group>
              <group name="Sphere001_10" position={[0, 1.277, 0]}>
                <mesh
                  name="Object_19"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_19.geometry}
                  material={materials.head}
                />
                <group name="wing1_8" position={[-0.022, 0.017, 0.013]}>
                  <mesh
                    name="Object_21"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_21.geometry}
                    material={materials.wings}
                  />
                </group>
                <group name="wing2_9" position={[-0.01, 0.017, 0.006]}>
                  <mesh
                    name="Object_23"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_23.geometry}
                    material={materials.wings}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/robot.glb')


export default Robot;