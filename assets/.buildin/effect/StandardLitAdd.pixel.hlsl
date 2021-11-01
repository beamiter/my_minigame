#include <common.inc>
#include <Library/lib.inc>

float4 Main(in FVertexOutput In) : SV_Target0
{
  SurfaceData surfaceData = (SurfaceData)0;
  InitializeSurfaceData(In.uv, surfaceData);

  PixelInput pixelInput = (PixelInput)0;
  InitializePixelInputCore(In, surfaceData.normalTS, pixelInput);

  BRDFData brdfData = (BRDFData)0;
  InitializeBRDFData(surfaceData, brdfData);
  
  
  fixed3 lighting = fixed3(0, 0, 0);
  for (int i = 0; i < MAX_LIGHT_NUM_FA; i++)
  {
      if (i < LIGHT_NUM)
      {
        Light light = GetAdditionalLight(i, In.positionWS.xyz);
        lighting += LightingPhysicallyBased(brdfData, light.color, light.direction, light.attenuation, pixelInput.normalWS,  pixelInput.viewDirWS);
      } 
  }

  fixed4 color = fixed4(lighting, surfaceData.alpha);

  APPLY_FOG(In, color);

  return color;
}