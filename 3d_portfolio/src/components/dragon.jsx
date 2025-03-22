import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Dragon = (props) => {
  const group = useRef();
  
  const { nodes, materials, animations } = useGLTF("/models/snow_dragon.glb");

  useFrame((state, delta) => {
      if(group.current)
          group.current.rotation.y += delta*0.09;
        
  });

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const action = actions.stand;

      if (action) {
        action.reset().play();
        action.loop = THREE.LoopRepeat;

        return () => {
          action.stop();
        };
      }
    }
  }, [actions, animations]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.989}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Sketchfab_model_0"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={20.612}
              >
                <group
                  name="zq127_binglong_modefbx_1"
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={0.01}
                >
                  <group name="Object_2_2">
                    <group name="RootNode_3">
                      <group name="zq127_binglong_mode_4" scale={1.5}>
                        <group name="Object_5_5">
                          <group name="GLTF_created_0">
                            <primitive
                              object={nodes.GLTF_created_0_rootJoint}
                            />
                            <skinnedMesh
                              name="Object_102"
                              geometry={nodes.Object_102.geometry}
                              material={materials.zq127_binglong_1}
                              skeleton={nodes.Object_102.skeleton}
                            />
                            <group name="Object_8_8_correction">
                              <group name="Object_8_8" />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/snow_dragon.glb");

export default Dragon;