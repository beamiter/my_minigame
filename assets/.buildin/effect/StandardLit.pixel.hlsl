#include <common.inc>
#include <Library/lib.inc>

float4 Main(in FVertexOutput In) : SV_Target0
{
  SurfaceData surfaceData = (SurfaceData)0;;
  InitializeSurfaceData(In.uv, surfaceData);

  PixelInput pixelInput = (PixelInput)0;
  InitializePixelInput(In, surfaceData.normalTS, pixelInput);

  fixed3 color = StandardLightingBase(surfaceData, pixelInput, LightColor, WorldSpaceLightDir);
  
  fixed4 finalColor = fixed4(color, surfaceData.alpha);
  
  #if EnableFog
    UNITY_APPLY_FOG(In.fogCoord, finalColor);
  #endif
  
  return finalColor;
}