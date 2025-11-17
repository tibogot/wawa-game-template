import React, { forwardRef } from "react";

export const Map11 = forwardRef<any, any>(
  (
    {
      scale = 1,
      position = [0, 0, 0] as [number, number, number],
      characterPosition,
      characterVelocity,
      onTerrainReady,
      ...props
    },
    ref
  ) => {
    return (
      <group>
        {/* Map11 - Empty for now */}
      </group>
    );
  }
);

