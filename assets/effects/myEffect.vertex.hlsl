
#include <common.inc>

// varying define
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


void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
    FVertexProcessOutput VPOut;
    Effect3DVertexProcess(In, VPOut);

    Out.TexCoord = In.TexCoord;

    // position
    Out.Position = WorldToClipPosition(VPOut.WorldPosition);

    float3 worldNormal = ObjectToWorldNormal(VPOut.Normal);
    float3 worldTangent = ObjectToWorldNormal(VPOut.Tangent.xyz);
    float3 worldBinormal = cross(worldTangent, worldNormal) * VPOut.Tangent.w;
    // transpose
    float3x3 worldToTangent = float3x3(worldTangent, worldBinormal, worldNormal);

    float3 worldSpaceViewDir = normalize(WorldSpaceViewPosition - VPOut.WorldPosition.xyz);
    float3 worldSpaceLightDir = WorldSpaceLightDir;

    // 法线贴图模式，在切线空间定义v_lightDir和v_viewDir，法线使用采样数据
    Out.LightDir = mul(worldToTangent, worldSpaceLightDir);
    Out.ViewDir = mul(worldToTangent, worldSpaceViewDir);

    TRANSFER_LIGHTMAP(In, Out);
    TRANSFER_SHADOW(Out, VPOut.WorldPosition.xyz);
    TRANSFER_FOG(Out, VPOut.WorldPosition.xyz);
}
