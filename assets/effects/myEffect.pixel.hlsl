
#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
    float3 LightDir : TEXCOORD1;
    float3 ViewDir : TEXCOORD2;
    float3 WorldPosition : TEXCOORD3;
    LIGHTMAP_COORDS(4)
    FOG_COORDS(5)
    SHADOW_COORDS(6)
};

cbuffer material
{
    float3 u_specularColor;
    float u_shininess;
    float4 u_diffuseColor;
    float u_diffuseIntensity;
    float3 u_emissionColor;
    float u_alphaTestValue;
    float4 _Color;
}

DECLARE_TEXTURE(u_diffuseTex);
DECLARE_TEXTURE(u_normalTex);
DECLARE_TEXTURE(u_emissionTex);


float4 Main(in FVertexOutput In) : SV_Target0
{
    return _Color;
}
