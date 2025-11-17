import React, { useRef, useMemo, useState, useCallback } from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { Zeldaterrain1 } from "./Zeldaterrain1";
export const Map6 = ({
  scale = 1,
  position = [0, 0, 0],
  characterPosition,
  characterVelocity,
  ...props
}) => {
  const group = useRef<THREE.Group>(null);

  // State to hold the heightmap lookup function from Zeldaterrain1
  const [heightmapLookup, setHeightmapLookup] = useState<
    ((x: number, z: number) => number) | null
  >(null);

  // Create stable fallback vectors
  const fallbackPosition = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // Callback when Zeldaterrain1 heightmap is ready
  const handleHeightmapReady = useCallback(
    (fn: (x: number, z: number) => number) => {
      console.log("✅ Map6 received heightmap lookup from Zeldaterrain1");
      setHeightmapLookup(() => fn);
    },
    []
  );

  // Function to get terrain height using Zeldaterrain1's lookup
  const getGroundHeight = useMemo(() => {
    return (x: number, z: number): number => {
      if (heightmapLookup) {
        return heightmapLookup(x, z);
      }
      return 0; // Fallback if lookup not ready
    };
  }, [heightmapLookup]);

  return (
    <group ref={group} {...props}>
      {/* Zelda Terrain 1 - using zeldaterrain1-transformed.glb */}
      <RigidBody type="fixed" colliders="trimesh">
        <Zeldaterrain1
          position={position}
          scale={scale}
          onHeightmapReady={handleHeightmapReady}
        />
      </RigidBody>

    </group>
  );
};
