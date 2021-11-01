#include <common.inc>
#include <Library/lib.inc>

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
  FVertexProcessOutput Skin;
  Effect3DVertexProcess(In, Skin);

  float4 positionWS = ObjectToWorldPosition(Skin.Position);
  Out.positionWS = positionWS;
  Out.position = WorldToClipPosition(positionWS);
  Out.uv = TRANSFER_TEXCOORD(In.TexCoord, _MainTex_ST);
  Out.normalWS = ObjectToWorldNormal(Skin.Normal);
  
  Out.viewDirWS = SafeNormalize(WorldSpaceViewPosition - positionWS.xyz);
  
  #if defined(USE_NORMAL_MAP)
    Out.tangentWS = ObjectToWorldNormal(Skin.Tangent.xyz);
    Out.bitangentWS = cross(Out.tangentWS, Out.normalWS) * Skin.Tangent.w;
  #endif

  TRANSFER_LIGHTMAP(In, Out);
  TRANSFER_SHADOW(Out, positionWS.xyz);
  TRANSFER_FOG(Out, positionWS.xyz);
}
